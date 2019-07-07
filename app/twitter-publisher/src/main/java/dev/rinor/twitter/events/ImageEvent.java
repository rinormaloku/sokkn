package dev.rinor.twitter.events;


import io.vertx.core.json.Json;

public class ImageEvent {

  private String imageUrl;
  private String imageTitle;
  private String status;

  public ImageEvent(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public ImageEvent() {
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  @Override
  public String toString() {
    return Json.encode(this);
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getImageTitle() {
    return imageTitle;
  }

  public void setImageTitle(String imageTitle) {
    this.imageTitle = imageTitle;
  }
}
