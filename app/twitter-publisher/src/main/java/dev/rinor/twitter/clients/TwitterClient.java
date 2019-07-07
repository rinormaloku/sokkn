package dev.rinor.twitter.clients;

import io.vertx.core.logging.LoggerFactory;
import twitter4j.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

public class TwitterClient {

  private static final io.vertx.core.logging.Logger LOGGER = LoggerFactory.getLogger(TwitterClient.class);

  public static void printTimeLine() throws TwitterException {
    Twitter twitter = TwitterFactory.getSingleton();
    ResponseList<twitter4j.Status> statuses = twitter.getHomeTimeline();
    System.out.println("Showing home timeline.");
    for (Status status : statuses) {
      System.out.println(status.getUser().getName() + ":" +
        status.getText());
    }
  }

  public static void uploadImage(String url) {
    try {
      Twitter twitter = TwitterFactory.getSingleton();
      UploadedMedia uploadedMedia = twitter.uploadMedia("lovely-face.jpg", new URL(url).openStream());
      StatusUpdate statusUpdate = new StatusUpdate("Hey there, lovely faces!");
      statusUpdate.setMediaIds(uploadedMedia.getMediaId());
      Status status = twitter.updateStatus(statusUpdate);
      LOGGER.info("Successfully updated the status to [" + status.getText() + "].");
    }
    catch (TwitterException te) {
      LOGGER.error("Failed uploading the image: " + te.getErrorMessage());
      throw new RuntimeException("Twitter api request failed");
    }
    catch (MalformedURLException e) {
      LOGGER.error(e.getMessage());
      throw new RuntimeException("URL is malformed");
    }
    catch (IOException e) {
      LOGGER.error(e.getMessage());
      throw new RuntimeException("Downloading file failure");
    }
  }
}
