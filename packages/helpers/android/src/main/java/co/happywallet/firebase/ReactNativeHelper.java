package co.happywallet.firebase.helpers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.facebook.react.bridge.ReadableMap;

import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

public class ReactNativeHelper {
  private static final String TAG = "ReactNativeHelper";

  public static Map<String, Object> recursivelyDeconstructReadableMap(ReadableMap readableMap) {
    Map<String, Object> deconstructedMap = new HashMap<>();
    if (readableMap == null) {
      return deconstructedMap;
    }

    ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
    while (iterator.hasNextKey()) {
      String key = iterator.nextKey();
      ReadableType type = readableMap.getType(key);
      switch (type) {
        case Null:
          deconstructedMap.put(key, null);
          break;
        case Boolean:
          deconstructedMap.put(key, readableMap.getBoolean(key));
          break;
        case Number:
          deconstructedMap.put(key, readableMap.getDouble(key));
          break;
        case String:
          deconstructedMap.put(key, readableMap.getString(key));
          break;
        case Map:
          deconstructedMap.put(key, ReactNativeHelper.recursivelyDeconstructReadableMap(readableMap.getMap(key)));
          break;
        case Array:
          deconstructedMap.put(key, ReactNativeHelper.recursivelyDeconstructReadableArray(readableMap.getArray(key)));
          break;
        default:
          throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
      }

    }
    return deconstructedMap;
  }

  public static List<Object> recursivelyDeconstructReadableArray(ReadableArray readableArray) {
    List<Object> deconstructedList = new ArrayList<>(readableArray.size());
    for (int i = 0; i < readableArray.size(); i++) {
      ReadableType indexType = readableArray.getType(i);
      switch (indexType) {
        case Null:
          deconstructedList.add(i, null);
          break;
        case Boolean:
          deconstructedList.add(i, readableArray.getBoolean(i));
          break;
        case Number:
          deconstructedList.add(i, readableArray.getDouble(i));
          break;
        case String:
          deconstructedList.add(i, readableArray.getString(i));
          break;
        case Map:
          deconstructedList.add(i, ReactNativeHelper.recursivelyDeconstructReadableMap(readableArray.getMap(i)));
          break;
        case Array:
          deconstructedList.add(i, ReactNativeHelper.recursivelyDeconstructReadableArray(readableArray.getArray(i)));
          break;
        default:
          throw new IllegalArgumentException("Could not convert object at index " + i + ".");
      }
    }
    return deconstructedList;
  }
}
