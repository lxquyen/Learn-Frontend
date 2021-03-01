import { useEffect, useState } from 'react';
import './App.scss';
import queryString from 'query-string';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import PostFiltersForm from './components/PostFiltersForm'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';
import MagicBox from './components/MagicBox';

function HomePage() {
    const [todoList, setTodoList] = useState([
        { id: 1, title: 'I love Easy Frontend! 😍 ' },
        { id: 2, title: 'We love Easy Frontend! 🥰 ' },
        { id: 3, title: 'They love Easy Frontend! 🚀 ' },
    ]);

    const [postList, setPostList] = useState([]);

    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 1,
    })

    const [filters, setFilters] = useState({
        _limit: 10,
        _page: 1,
        title_like: '',
    })

    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramsString = queryString.stringify(filters);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                console.log({ responseJSON })

                const { data, pagination } = responseJSON;
                setPostList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch post list: ', error.message);
            }

        }

        fetchPostList();

    }, [filters])

    function handlePageChange(newPage) {
        console.log('New page: ', newPage);
        setFilters({
            ...filters,
            _page: newPage,
        })
    }

    function handleTodoClick(todo) {
        console.log(todo)
        const index = todoList.findIndex(x => x.id === todo.id)
        if (index < 0) return
        const newTodoList = [...todoList]
        newTodoList.splice(index, 1);

        setTodoList(newTodoList);
    }

    function handleTodoFormSubmit(formVlues) {
        console.log('Form submit: ', formVlues);
        //add new todo to current todo list
        const newTodo = {
            id: todoList.length + 1,
            ...formVlues,
        }
        const newTodoList = [...todoList];
        newTodoList.push(newTodo);

        setTodoList(newTodoList);
    }


    function handleFiltersChange(newFilters) {
        console.log('New filters: ', newFilters);
        setFilters({
            ...filters,
            _page: 1,
            title_like: newFilters.searchTerm,
        })
    }

    const [showClock, setShowClock] = useState(true);

    return (
        <div className="app">
            <h1>Welcom to React Hooks</h1>
            <MagicBox />

            {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
            {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
            {/* <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange} /> */}

            {/* {showClock && <Clock />}

      {showClock && <BetterClock />}

      <button onClick={() => setShowClock(false)}>Hide Clock</button> */}

        </div>
    );
}

export default App;
