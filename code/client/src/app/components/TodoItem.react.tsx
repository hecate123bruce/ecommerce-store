/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

///<reference path="../../../typings/tsd.d.ts"/>
import * as React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';
import classNames from 'classnames';
import Task from '../stores/Task';

interface TodoItemProps { key?:string, todoid: string, name: string, done: boolean, isEditing?: boolean }
interface TodoItemState { id: string, name: string, done: boolean, isEditing: boolean }

export default class TodoItem extends React.Component<TodoItemProps, TodoItemState> {

    static propTypes: React.ValidationMap<TodoItemProps> = {
        todoid: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        done: React.PropTypes.bool.isRequired
    }

  constructor(props: TodoItemProps) {
    super(props);
    this.state = {
      id: props.todoid,
      name: props.name,
      done: props.done,
      isEditing: props.isEditing || false
    }
  }

  _updateState(props) {
    this.setState({
      id: props.todoid,
      name: props.name,
      done: props.done,
      isEditing: props.isEditing || false
    });
  }

  componentDidMount() {
    console.log('todoItem:componentDidMount');
    this._updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('todoItem:componentWillReceiveProps');
    this._updateState(nextProps);
  }

  /**
   * @return {object}
   */
  render() {
    var input;
    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave.bind(this)}
          value={this.state.name}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={classNames({
          'completed': this.state.done,
          'editing': this.state.isEditing
        })}
        key={this.state.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.state.done}
            onChange={this._onToggleComplete.bind(this)}
          />
          <label onDoubleClick={this._onDoubleClick.bind(this)}>
            {this.state.name}
          </label>
          <button className="destroy" onClick={this._onDestroyClick.bind(this)} />
        </div>
        {input}
      </li>
    );
  };

  _onToggleComplete() {
      var t: Task = {
          id: this.state.id,
          name: this.state.name,
          done: this.state.done
      };
      TodoActions.toggleComplete(t);
  };

  _onDoubleClick() {
      this.setState({
          id: this.state.id,
          name: this.state.name,
          done: this.state.done,
          isEditing: true
      });
  };

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave(text) {
    TodoActions.updateText(this.state.id, text);
    this.setState({
        id: this.state.id,
        name: this.state.name,
        done: this.state.done,
        isEditing: false
    });
  };

  _onDestroyClick() {
    TodoActions.destroy(this.state.id);
  };

}
