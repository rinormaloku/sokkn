package dev.rinor.twitter.clients;

import org.junit.jupiter.api.Test;
import twitter4j.TwitterException;

class TwitterClientTest {

  @Test
  void verifyAccess() throws TwitterException {
    TwitterClient.printTimeLine();
  }

  @Test
  void verifyUpload() {
    TwitterClient.uploadImage("https://i.imgur.com/4hFs2mN.png");
  }
}

