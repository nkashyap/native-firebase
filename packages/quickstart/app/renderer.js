import React from 'react';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  label: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  labelText: {
    fontSize: 15,
    color: 'green',
  },
  message: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  messageText: {
    fontSize: 14,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rowText: {
    fontSize: 13,
  },
});

export default class Renderer {
  static label(label) {
    return (
      <View>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            {label}
          </Text>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }

  static message(message) {
    return (
      <View>
        <View style={styles.message}>
          {
            typeof message === 'object' ?
              message : <Text style={styles.messageText}>{String(message)}</Text>
          }
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }

  static property(property, value) {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {property}: {value}
          </Text>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }

  static method(method, callback = () => {}) {
    return (
      <View>
        <TouchableHighlight onPress={() => callback(method)}>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {method}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
      </View>
    );
  }
}
