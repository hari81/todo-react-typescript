import React from 'react';
import { connect } from 'react-redux';
import {Todo, fetchTodos, deleteTodo} from '../actions';
import {StoreState} from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

const mapStateToProps = (state: StoreState): {todos: Todo[]} => {
  return {todos: state.todos};
}

interface AppState {
  fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {fetching: false}
  }
  // state = {
  //   fetching: false
  // }
  componentDidUpdate (previousPros: AppProps): void {
    if (!previousPros.todos.length && this.props.todos.length > 0) {
      this.setState({fetching: false})
    }
  }
  onButtonClick = (): void => {
    this.setState({fetching: true})
    this.props.fetchTodos();
  }
  deleteTodoClick = (id: number): void => {
    this.props.deleteTodo(id)
  }
  returnList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return <p key={todo.id} onClick={() => this.deleteTodoClick(todo.id)}>{todo.title}</p>
    })
  }

  render() {
    return <div>
      <button onClick={this.onButtonClick}>Fetch</button>
      {this.state.fetching
        ? <div> ...Loading </div>
        : this.returnList()
      }
    </div>
  }
}

export const App = connect(mapStateToProps, {fetchTodos, deleteTodo})(_App)