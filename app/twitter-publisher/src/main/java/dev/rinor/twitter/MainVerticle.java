package dev.rinor.twitter;


import dev.rinor.twitter.clients.TwitterClient;
import dev.rinor.twitter.events.ImageEvent;
import io.cloudevents.CloudEvent;
import io.cloudevents.http.reactivex.vertx.VertxCloudEvents;
import io.reactivex.Completable;
import io.reactivex.functions.Action;
import io.reactivex.functions.Consumer;
import io.vertx.core.json.Json;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.reactivex.core.AbstractVerticle;
import io.vertx.reactivex.ext.web.Router;
import io.vertx.reactivex.ext.web.RoutingContext;

public class MainVerticle extends AbstractVerticle {

  private static final Logger LOGGER = LoggerFactory.getLogger(MainVerticle.class);

  @Override
  public void start() {
    LOGGER.info("Verticle started");

    Router router = Router.router(vertx);

    router.get("/healthZ").handler(this::healthCheck);
    router.route("/").handler(this::receiveTwitterUploadEvent);

    startServer(router);
  }

  private void receiveTwitterUploadEvent(RoutingContext req) {
    VertxCloudEvents.create().rxReadFromRequest(req.request())
      .subscribe((receivedEvent, throwable) -> {
        if (receivedEvent == null) {
          LOGGER.warn("The received event was empty");
          return;
        }

        ImageEvent imageEvent = unmarshall(receivedEvent);

        Completable.fromRunnable(() -> TwitterClient.uploadImage(imageEvent.getImageUrl()))
          .subscribe(printOnSuccess(), printOnError());
      });
    req.response().end();
  }

  private ImageEvent unmarshall(CloudEvent<Object> receivedEvent) {
    return Json.decodeValue(
      receivedEvent.getData().orElse("{}").toString(),
      ImageEvent.class);
  }

  private Action printOnSuccess() {
    return () -> LOGGER.info("Image published to twitter account");
  }

  private Consumer<Throwable> printOnError() {
    return ex -> LOGGER.error(ex.getMessage());
  }

  private void startServer(Router router) {
    vertx.createHttpServer()
      .requestHandler(router)
      .rxListen(config().getInteger("SERVER_PORT", 8080))
      .subscribe(server -> LOGGER.info("Server running!"));
  }

  private void healthCheck(RoutingContext routingContext) {
    routingContext.response().end("Healthy!");
  }
}
