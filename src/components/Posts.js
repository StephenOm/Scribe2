import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  ScrollView,
  RefreshControl
} from 'react-native';
import PostRow from './PostRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(props.data),
      refreshing: false
    };

    this.updateRefreshing = this.updateRefreshing.bind(this);
    this.refreshMessages = this.refreshMessages.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.data)
    });
  }

  refreshMessages() {
    this.setState({refreshing: true});
    this.props.getMessages(this.updateRefreshing);
  }

  updateRefreshing() {
    this.setState({
      refreshing: false
    });
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refreshMessages}
          />
        }
      >
        <ListView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.container}
          dataSource={this.state.dataSource}
          renderRow={data => <PostRow message={data} />}
        />
      </ScrollView>
    );
  }
}
