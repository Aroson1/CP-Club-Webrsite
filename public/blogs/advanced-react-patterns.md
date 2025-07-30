# Advanced React Patterns

Master complex React patterns to build more maintainable and reusable components. This guide covers advanced techniques that will elevate your React development skills.

## Render Props Pattern

Render props is a technique for sharing code between React components using a prop whose value is a function. This pattern allows components to share state and behavior without tightly coupling them.

### Basic Render Props

```jsx
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };
  
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <h1>The mouse position is ({x}, {y})</h1>
      )}
    />
  );
}
```

### Modern Render Props with Hooks

```jsx
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return position;
}

function MouseTracker({ children }) {
  const position = useMousePosition();
  return children(position);
}

// Usage
function App() {
  return (
    <MouseTracker>
      {({ x, y }) => (
        <h1>The mouse position is ({x}, {y})</h1>
      )}
    </MouseTracker>
  );
}
```

## Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new component with additional props or behavior.

### Authentication HOC

```jsx
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Check authentication status
      checkAuth().then(authStatus => {
        setIsAuthenticated(authStatus);
        setLoading(false);
      });
    }, []);
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <div>Please log in to access this page.</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

### Error Boundary HOC

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }
    
    return this.props.children;
  }
}

function withErrorBoundary(WrappedComponent, fallback) {
  return function ErrorBoundaryComponent(props) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
```

## Custom Hooks

Extract component logic into reusable functions that can be shared across components.

### useLocalStorage Hook

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function UserPreferences() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');
  
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme ({theme})
      </button>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
}
```

### useAPI Hook

```jsx
function useAPI(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useAPI(`/api/users/${userId}`);
  
  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## Compound Components

Create flexible and reusable component APIs by allowing components to work together while maintaining a clean interface.

### Modal Component

```jsx
const ModalContext = React.createContext();

function Modal({ children, isOpen, onClose }) {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

Modal.Header = function ModalHeader({ children }) {
  const { onClose } = useContext(ModalContext);
  return (
    <div className="modal-header">
      {children}
      <button onClick={onClose} className="close-button">×</button>
    </div>
  );
};

Modal.Body = function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
};

Modal.Footer = function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
};

// Usage
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <h2>Confirm Action</h2>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button onClick={() => setIsModalOpen(false)}>Confirm</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
```

### Accordion Component

```jsx
const AccordionContext = React.createContext();

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState(new Set());
  
  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(index);
    }
    
    setOpenItems(newOpenItems);
  };
  
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className="accordion">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { index })
        )}
      </div>
    </AccordionContext.Provider>
  );
}

Accordion.Item = function AccordionItem({ children, index }) {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const isOpen = openItems.has(index);
  
  return (
    <div className="accordion-item">
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, onToggle: () => toggleItem(index) })
      )}
    </div>
  );
};

Accordion.Header = function AccordionHeader({ children, isOpen, onToggle }) {
  return (
    <button className="accordion-header" onClick={onToggle}>
      {children}
      <span>{isOpen ? '−' : '+'}</span>
    </button>
  );
};

Accordion.Panel = function AccordionPanel({ children, isOpen }) {
  return isOpen ? <div className="accordion-panel">{children}</div> : null;
};

// Usage
function FAQ() {
  return (
    <Accordion allowMultiple>
      <Accordion.Item>
        <Accordion.Header>What is React?</Accordion.Header>
        <Accordion.Panel>
          React is a JavaScript library for building user interfaces.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>How do hooks work?</Accordion.Header>
        <Accordion.Panel>
          Hooks let you use state and other React features without writing a class.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

## State Management Patterns

### Reducer Pattern

```jsx
const initialState = {
  todos: [],
  filter: 'all'
};

function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const [inputValue, setInputValue] = useState('');
  
  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };
  
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'completed') return todo.completed;
    if (state.filter === 'active') return !todo.completed;
    return true;
  });
  
  return (
    <div>
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      
      <div>
        {['all', 'active', 'completed'].map(filter => (
          <button
            key={filter}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
            className={state.filter === filter ? 'active' : ''}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Performance Optimization Patterns

### Memoization with React.memo

```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data, onAction }) {
  console.log('ExpensiveComponent rendered');
  
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: item.value * 2
    }));
  }, [data]);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => onAction(item)}>
          {item.name}: {item.processed}
        </div>
      ))}
    </div>
  );
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: 20 }
  ]);
  
  const handleAction = useCallback((item) => {
    console.log('Action performed on:', item);
  }, []);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveComponent data={data} onAction={handleAction} />
    </div>
  );
}
```

### Virtual Scrolling

```jsx
function VirtualList({ items, itemHeight = 50, containerHeight = 300 }) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItemsCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemsCount, items.length);
  
  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              className="list-item"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Advanced Context Patterns

### Context with Reducer

```jsx
const StateContext = React.createContext();
const DispatchContext = React.createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useAppState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}

function useAppDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context;
}

// Custom hook that combines both
function useApp() {
  return [useAppState(), useAppDispatch()];
}
```

## Testing Patterns

### Testing Custom Hooks

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});

test('should decrement counter', () => {
  const { result } = renderHook(() => useCounter(10));
  
  act(() => {
    result.current.decrement();
  });
  
  expect(result.current.count).toBe(9);
});
```

### Testing Components with Context

```jsx
import { render, screen } from '@testing-library/react';
import { AppProvider } from './AppProvider';
import { UserProfile } from './UserProfile';

function renderWithProvider(ui, options) {
  function Wrapper({ children }) {
    return <AppProvider>{children}</AppProvider>;
  }
  
  return render(ui, { wrapper: Wrapper, ...options });
}

test('displays user name', () => {
  renderWithProvider(<UserProfile userId="123" />);
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

## Best Practices

### 1. Prefer Composition Over Inheritance

```jsx
// Instead of inheritance
class Button extends Component {
  render() {
    return <button className="btn btn-primary">{this.props.children}</button>;
  }
}

// Use composition
function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
}
```

### 2. Use Proper Key Props

```jsx
// Bad - using index as key
{items.map((item, index) => (
  <Item key={index} data={item} />
))}

// Good - using stable unique identifier
{items.map(item => (
  <Item key={item.id} data={item} />
))}
```

### 3. Minimize Bundle Size

```jsx
// Instead of importing entire library
import _ from 'lodash';

// Import only what you need
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
```

## Conclusion

These advanced React patterns provide powerful tools for building maintainable, reusable, and performant applications. Key takeaways:

- **Render Props and Custom Hooks** enable code reuse and logic sharing
- **HOCs** add cross-cutting concerns to components
- **Compound Components** create flexible APIs
- **Proper state management** keeps applications organized
- **Performance optimization** ensures smooth user experiences
- **Testing patterns** maintain code quality

Start by implementing these patterns in small parts of your application, and gradually adopt them throughout your codebase. Remember that not every component needs to use advanced patterns – choose the right tool for the job based on your specific requirements.

The React ecosystem continues to evolve, with hooks generally preferred over class-based patterns for new development. Focus on understanding the principles behind these patterns, as they'll help you make better architectural decisions regardless of the specific API changes in future React versions.
