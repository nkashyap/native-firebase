package co.happywallet.firebase.helpers;

public class StringHelper {
  private static final String TAG = "StringHelper";

  public static boolean isEmpty(String text) {
    return text == null || text.isEmpty();
  }
}
