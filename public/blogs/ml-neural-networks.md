# Machine Learning Fundamentals: Neural Network Basics

Introduction to neural networks, how they work, and implementing your first network from scratch. Dive deep into the building blocks of modern artificial intelligence.

## What are Neural Networks?

Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information by passing signals through weighted connections, learning patterns from data through training.

### Historical Context

- **1943**: McCulloch-Pitts artificial neuron model
- **1958**: Perceptron algorithm by Frank Rosenblatt
- **1986**: Backpropagation algorithm popularized
- **2006**: Deep learning renaissance begins
- **2012**: AlexNet revolutionizes computer vision
- **Present**: Transformers and foundation models

## Biological Inspiration

### How Biological Neurons Work

```
Dendrites → Cell Body → Axon → Synapses
    ↓         ↓        ↓        ↓
  Input → Processing → Output → Connection
```

Artificial neurons mimic this process:
- **Inputs**: Multiple weighted signals
- **Processing**: Summation and activation
- **Output**: Signal passed to next layer
- **Learning**: Adjusting connection weights

## Basic Neural Network Components

### 1. Neurons (Nodes)

```python
import numpy as np
import matplotlib.pyplot as plt

class Neuron:
    def __init__(self, num_inputs):
        # Initialize weights randomly
        self.weights = np.random.randn(num_inputs) * 0.1
        self.bias = np.random.randn() * 0.1
        
    def forward(self, inputs):
        # Weighted sum + bias
        z = np.dot(inputs, self.weights) + self.bias
        # Apply activation function
        return self.sigmoid(z)
    
    def sigmoid(self, x):
        # Sigmoid activation function
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))  # Clip to prevent overflow
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)

# Example usage
neuron = Neuron(3)
inputs = np.array([0.5, -0.2, 0.8])
output = neuron.forward(inputs)
print(f"Neuron output: {output}")
```

### 2. Activation Functions

Different activation functions serve different purposes:

```python
class ActivationFunctions:
    @staticmethod
    def sigmoid(x):
        """Sigmoid: outputs between 0 and 1"""
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    @staticmethod
    def tanh(x):
        """Tanh: outputs between -1 and 1"""
        return np.tanh(x)
    
    @staticmethod
    def relu(x):
        """ReLU: outputs x if x > 0, else 0"""
        return np.maximum(0, x)
    
    @staticmethod
    def leaky_relu(x, alpha=0.01):
        """Leaky ReLU: small slope for negative values"""
        return np.where(x > 0, x, alpha * x)
    
    @staticmethod
    def softmax(x):
        """Softmax: outputs probability distribution"""
        exp_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
        return exp_x / np.sum(exp_x, axis=-1, keepdims=True)

# Visualize activation functions
def plot_activation_functions():
    x = np.linspace(-5, 5, 100)
    
    fig, axes = plt.subplots(2, 2, figsize=(12, 10))
    
    # Sigmoid
    axes[0, 0].plot(x, ActivationFunctions.sigmoid(x))
    axes[0, 0].set_title('Sigmoid')
    axes[0, 0].grid(True)
    
    # Tanh
    axes[0, 1].plot(x, ActivationFunctions.tanh(x))
    axes[0, 1].set_title('Tanh')
    axes[0, 1].grid(True)
    
    # ReLU
    axes[1, 0].plot(x, ActivationFunctions.relu(x))
    axes[1, 0].set_title('ReLU')
    axes[1, 0].grid(True)
    
    # Leaky ReLU
    axes[1, 1].plot(x, ActivationFunctions.leaky_relu(x))
    axes[1, 1].set_title('Leaky ReLU')
    axes[1, 1].grid(True)
    
    plt.tight_layout()
    plt.show()
```

### 3. Loss Functions

Loss functions measure how far predictions are from actual values:

```python
class LossFunctions:
    @staticmethod
    def mean_squared_error(y_true, y_pred):
        """MSE: for regression problems"""
        return np.mean((y_true - y_pred) ** 2)
    
    @staticmethod
    def binary_cross_entropy(y_true, y_pred):
        """Binary cross-entropy: for binary classification"""
        epsilon = 1e-15  # Prevent log(0)
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))
    
    @staticmethod
    def categorical_cross_entropy(y_true, y_pred):
        """Categorical cross-entropy: for multi-class classification"""
        epsilon = 1e-15
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        return -np.sum(y_true * np.log(y_pred)) / y_true.shape[0]
    
    @staticmethod
    def mse_derivative(y_true, y_pred):
        return 2 * (y_pred - y_true) / y_true.shape[0]
    
    @staticmethod
    def binary_cross_entropy_derivative(y_true, y_pred):
        epsilon = 1e-15
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        return -(y_true / y_pred - (1 - y_true) / (1 - y_pred)) / y_true.shape[0]
```

## Building Your First Neural Network

### Simple Neural Network from Scratch

```python
class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size, learning_rate=0.1):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        self.learning_rate = learning_rate
        
        # Initialize weights and biases
        self.W1 = np.random.randn(input_size, hidden_size) * 0.1
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.1
        self.b2 = np.zeros((1, output_size))
        
        # Store activations for backpropagation
        self.z1 = None
        self.a1 = None
        self.z2 = None
        self.a2 = None
    
    def forward(self, X):
        """Forward propagation"""
        # Hidden layer
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        
        # Output layer
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        
        return self.a2
    
    def backward(self, X, y, output):
        """Backward propagation"""
        m = X.shape[0]  # Number of examples
        
        # Calculate gradients for output layer
        dz2 = output - y
        dW2 = (1/m) * np.dot(self.a1.T, dz2)
        db2 = (1/m) * np.sum(dz2, axis=0, keepdims=True)
        
        # Calculate gradients for hidden layer
        dz1 = np.dot(dz2, self.W2.T) * self.sigmoid_derivative(self.a1)
        dW1 = (1/m) * np.dot(X.T, dz1)
        db1 = (1/m) * np.sum(dz1, axis=0, keepdims=True)
        
        # Update weights and biases
        self.W2 -= self.learning_rate * dW2
        self.b2 -= self.learning_rate * db2
        self.W1 -= self.learning_rate * dW1
        self.b1 -= self.learning_rate * db1
    
    def train(self, X, y, epochs):
        """Train the neural network"""
        losses = []
        
        for epoch in range(epochs):
            # Forward propagation
            output = self.forward(X)
            
            # Calculate loss
            loss = self.binary_cross_entropy(y, output)
            losses.append(loss)
            
            # Backward propagation
            self.backward(X, y, output)
            
            if epoch % 100 == 0:
                print(f'Epoch {epoch}, Loss: {loss:.4f}')
        
        return losses
    
    def predict(self, X):
        """Make predictions"""
        return self.forward(X)
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)
    
    def binary_cross_entropy(self, y_true, y_pred):
        epsilon = 1e-15
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

# Example: XOR Problem
def solve_xor_problem():
    # XOR dataset
    X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
    y = np.array([[0], [1], [1], [0]])
    
    # Create and train network
    nn = SimpleNeuralNetwork(input_size=2, hidden_size=4, output_size=1, learning_rate=1.0)
    losses = nn.train(X, y, epochs=1000)
    
    # Test predictions
    predictions = nn.predict(X)
    print("\nXOR Problem Results:")
    print("Input | Target | Prediction | Rounded")
    print("-" * 40)
    for i in range(len(X)):
        print(f"{X[i]} |   {y[i][0]}    |   {predictions[i][0]:.4f}   |    {round(predictions[i][0])}")
    
    # Plot loss curve
    plt.figure(figsize=(10, 6))
    plt.plot(losses)
    plt.title('Training Loss Over Time')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.grid(True)
    plt.show()
    
    return nn, losses

# Run the XOR example
# nn, losses = solve_xor_problem()
```

## Advanced Neural Network Implementation

### Multi-layer Neural Network with More Features

```python
class NeuralNetwork:
    def __init__(self, layers, activation='relu', output_activation='sigmoid', 
                 learning_rate=0.01, optimizer='sgd'):
        self.layers = layers
        self.activation = activation
        self.output_activation = output_activation
        self.learning_rate = learning_rate
        self.optimizer = optimizer
        
        self.weights = []
        self.biases = []
        self.activations = []
        self.z_values = []
        
        # Initialize weights and biases
        self.initialize_parameters()
        
        # Initialize optimizer parameters
        if optimizer == 'adam':
            self.init_adam()
    
    def initialize_parameters(self):
        """Initialize weights using Xavier/He initialization"""
        for i in range(len(self.layers) - 1):
            if self.activation == 'relu':
                # He initialization for ReLU
                weight = np.random.randn(self.layers[i], self.layers[i+1]) * np.sqrt(2.0/self.layers[i])
            else:
                # Xavier initialization for sigmoid/tanh
                weight = np.random.randn(self.layers[i], self.layers[i+1]) * np.sqrt(1.0/self.layers[i])
            
            bias = np.zeros((1, self.layers[i+1]))
            
            self.weights.append(weight)
            self.biases.append(bias)
    
    def init_adam(self):
        """Initialize Adam optimizer parameters"""
        self.m_weights = [np.zeros_like(w) for w in self.weights]
        self.v_weights = [np.zeros_like(w) for w in self.weights]
        self.m_biases = [np.zeros_like(b) for b in self.biases]
        self.v_biases = [np.zeros_like(b) for b in self.biases]
        self.t = 0  # Time step
    
    def forward(self, X):
        """Forward propagation through all layers"""
        self.activations = [X]
        self.z_values = []
        
        activation = X
        
        for i in range(len(self.weights)):
            z = np.dot(activation, self.weights[i]) + self.biases[i]
            self.z_values.append(z)
            
            if i == len(self.weights) - 1:  # Output layer
                if self.output_activation == 'softmax':
                    activation = self.softmax(z)
                elif self.output_activation == 'sigmoid':
                    activation = self.sigmoid(z)
                else:
                    activation = z  # Linear output
            else:  # Hidden layers
                if self.activation == 'relu':
                    activation = self.relu(z)
                elif self.activation == 'tanh':
                    activation = self.tanh(z)
                else:
                    activation = self.sigmoid(z)
            
            self.activations.append(activation)
        
        return activation
    
    def backward(self, X, y):
        """Backward propagation"""
        m = X.shape[0]
        
        # Calculate gradients
        dW = [np.zeros_like(w) for w in self.weights]
        db = [np.zeros_like(b) for b in self.biases]
        
        # Output layer error
        if self.output_activation == 'softmax':
            dz = self.activations[-1] - y
        else:
            dz = (self.activations[-1] - y) * self.activation_derivative(
                self.activations[-1], self.output_activation)
        
        # Backpropagate through layers
        for i in reversed(range(len(self.weights))):
            dW[i] = (1/m) * np.dot(self.activations[i].T, dz)
            db[i] = (1/m) * np.sum(dz, axis=0, keepdims=True)
            
            if i > 0:  # Not the first layer
                dz = (np.dot(dz, self.weights[i].T) * 
                      self.activation_derivative(self.activations[i], self.activation))
        
        # Update parameters
        self.update_parameters(dW, db)
    
    def update_parameters(self, dW, db):
        """Update parameters using chosen optimizer"""
        if self.optimizer == 'sgd':
            for i in range(len(self.weights)):
                self.weights[i] -= self.learning_rate * dW[i]
                self.biases[i] -= self.learning_rate * db[i]
        
        elif self.optimizer == 'adam':
            self.t += 1
            beta1, beta2 = 0.9, 0.999
            epsilon = 1e-8
            
            for i in range(len(self.weights)):
                # Update momentum terms
                self.m_weights[i] = beta1 * self.m_weights[i] + (1 - beta1) * dW[i]
                self.v_weights[i] = beta2 * self.v_weights[i] + (1 - beta2) * (dW[i] ** 2)
                self.m_biases[i] = beta1 * self.m_biases[i] + (1 - beta1) * db[i]
                self.v_biases[i] = beta2 * self.v_biases[i] + (1 - beta2) * (db[i] ** 2)
                
                # Bias correction
                m_w_corrected = self.m_weights[i] / (1 - beta1 ** self.t)
                v_w_corrected = self.v_weights[i] / (1 - beta2 ** self.t)
                m_b_corrected = self.m_biases[i] / (1 - beta1 ** self.t)
                v_b_corrected = self.v_biases[i] / (1 - beta2 ** self.t)
                
                # Update parameters
                self.weights[i] -= self.learning_rate * m_w_corrected / (np.sqrt(v_w_corrected) + epsilon)
                self.biases[i] -= self.learning_rate * m_b_corrected / (np.sqrt(v_b_corrected) + epsilon)
    
    def train(self, X, y, epochs, batch_size=32, validation_data=None, verbose=True):
        """Train the network with mini-batch gradient descent"""
        train_losses = []
        val_losses = []
        train_accuracies = []
        val_accuracies = []
        
        for epoch in range(epochs):
            # Shuffle data
            indices = np.random.permutation(X.shape[0])
            X_shuffled = X[indices]
            y_shuffled = y[indices]
            
            # Mini-batch training
            for i in range(0, X.shape[0], batch_size):
                X_batch = X_shuffled[i:i+batch_size]
                y_batch = y_shuffled[i:i+batch_size]
                
                # Forward and backward pass
                self.forward(X_batch)
                self.backward(X_batch, y_batch)
            
            # Calculate metrics
            train_pred = self.forward(X)
            train_loss = self.calculate_loss(y, train_pred)
            train_acc = self.calculate_accuracy(y, train_pred)
            
            train_losses.append(train_loss)
            train_accuracies.append(train_acc)
            
            if validation_data:
                X_val, y_val = validation_data
                val_pred = self.forward(X_val)
                val_loss = self.calculate_loss(y_val, val_pred)
                val_acc = self.calculate_accuracy(y_val, val_pred)
                val_losses.append(val_loss)
                val_accuracies.append(val_acc)
            
            if verbose and epoch % 100 == 0:
                if validation_data:
                    print(f'Epoch {epoch}: Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.4f}, '
                          f'Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.4f}')
                else:
                    print(f'Epoch {epoch}: Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.4f}')
        
        return {
            'train_losses': train_losses,
            'val_losses': val_losses,
            'train_accuracies': train_accuracies,
            'val_accuracies': val_accuracies
        }
    
    def predict(self, X):
        """Make predictions"""
        return self.forward(X)
    
    def calculate_loss(self, y_true, y_pred):
        """Calculate loss based on output activation"""
        if self.output_activation == 'softmax':
            return self.categorical_cross_entropy(y_true, y_pred)
        else:
            return self.binary_cross_entropy(y_true, y_pred)
    
    def calculate_accuracy(self, y_true, y_pred):
        """Calculate accuracy"""
        if self.output_activation == 'softmax':
            predictions = np.argmax(y_pred, axis=1)
            labels = np.argmax(y_true, axis=1)
        else:
            predictions = (y_pred > 0.5).astype(int)
            labels = y_true.astype(int)
        
        return np.mean(predictions == labels)
    
    # Activation functions
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def relu(self, x):
        return np.maximum(0, x)
    
    def tanh(self, x):
        return np.tanh(x)
    
    def softmax(self, x):
        exp_x = np.exp(x - np.max(x, axis=1, keepdims=True))
        return exp_x / np.sum(exp_x, axis=1, keepdims=True)
    
    def activation_derivative(self, x, activation_type):
        if activation_type == 'sigmoid':
            return x * (1 - x)
        elif activation_type == 'relu':
            return (x > 0).astype(float)
        elif activation_type == 'tanh':
            return 1 - x ** 2
        return np.ones_like(x)
    
    # Loss functions
    def binary_cross_entropy(self, y_true, y_pred):
        epsilon = 1e-15
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))
    
    def categorical_cross_entropy(self, y_true, y_pred):
        epsilon = 1e-15
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        return -np.mean(np.sum(y_true * np.log(y_pred), axis=1))
```

## Practical Example: Iris Classification

```python
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler, LabelBinarizer
from sklearn.model_selection import train_test_split

def iris_classification_example():
    # Load and prepare data
    iris = load_iris()
    X, y = iris.data, iris.target
    
    # Preprocess data
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # One-hot encode labels
    label_binarizer = LabelBinarizer()
    y_onehot = label_binarizer.fit_transform(y)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y_onehot, test_size=0.2, random_state=42, stratify=y
    )
    
    # Create and train network
    nn = NeuralNetwork(
        layers=[4, 10, 3],  # Input: 4 features, Hidden: 10 neurons, Output: 3 classes
        activation='relu',
        output_activation='softmax',
        learning_rate=0.01,
        optimizer='adam'
    )
    
    # Train the network
    history = nn.train(
        X_train, y_train, 
        epochs=1000, 
        batch_size=16,
        validation_data=(X_test, y_test),
        verbose=True
    )
    
    # Final evaluation
    test_predictions = nn.predict(X_test)
    test_accuracy = nn.calculate_accuracy(y_test, test_predictions)
    print(f"\nFinal Test Accuracy: {test_accuracy:.4f}")
    
    # Plot training history
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.plot(history['train_losses'], label='Train Loss')
    plt.plot(history['val_losses'], label='Validation Loss')
    plt.title('Loss Over Time')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True)
    
    plt.subplot(1, 3, 2)
    plt.plot(history['train_accuracies'], label='Train Accuracy')
    plt.plot(history['val_accuracies'], label='Validation Accuracy')
    plt.title('Accuracy Over Time')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()
    plt.grid(True)
    
    plt.subplot(1, 3, 3)
    # Confusion matrix
    y_pred_classes = np.argmax(test_predictions, axis=1)
    y_true_classes = np.argmax(y_test, axis=1)
    
    from sklearn.metrics import confusion_matrix
    import seaborn as sns
    
    cm = confusion_matrix(y_true_classes, y_pred_classes)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    
    plt.tight_layout()
    plt.show()
    
    return nn, history

# Run the iris classification example
# nn, history = iris_classification_example()
```

## Understanding Backpropagation

### Step-by-Step Backpropagation Visualization

```python
class BackpropagationVisualizer:
    def __init__(self):
        pass
    
    def demonstrate_gradient_calculation(self):
        """Demonstrate how gradients are calculated"""
        
        # Simple network: 2 inputs -> 1 hidden -> 1 output
        # Weights
        w1, w2 = 0.5, -0.3  # Input to hidden
        w3 = 0.8             # Hidden to output
        
        # Biases
        b1, b2 = 0.1, -0.2
        
        # Input and target
        x1, x2 = 1.0, 0.5
        target = 1.0
        
        print("=== Forward Pass ===")
        
        # Hidden layer
        z1 = w1 * x1 + w2 * x2 + b1
        a1 = 1 / (1 + np.exp(-z1))  # Sigmoid
        print(f"Hidden layer: z1 = {z1:.4f}, a1 = {a1:.4f}")
        
        # Output layer
        z2 = w3 * a1 + b2
        a2 = 1 / (1 + np.exp(-z2))  # Sigmoid
        print(f"Output layer: z2 = {z2:.4f}, a2 = {a2:.4f}")
        
        # Loss
        loss = 0.5 * (target - a2) ** 2
        print(f"Loss: {loss:.4f}")
        
        print("\n=== Backward Pass ===")
        
        # Output layer gradients
        dL_da2 = -(target - a2)
        da2_dz2 = a2 * (1 - a2)  # Sigmoid derivative
        dL_dz2 = dL_da2 * da2_dz2
        
        dL_dw3 = dL_dz2 * a1
        dL_db2 = dL_dz2
        
        print(f"Output gradients: dL/dw3 = {dL_dw3:.4f}, dL/db2 = {dL_db2:.4f}")
        
        # Hidden layer gradients
        dL_da1 = dL_dz2 * w3
        da1_dz1 = a1 * (1 - a1)  # Sigmoid derivative
        dL_dz1 = dL_da1 * da1_dz1
        
        dL_dw1 = dL_dz1 * x1
        dL_dw2 = dL_dz1 * x2
        dL_db1 = dL_dz1
        
        print(f"Hidden gradients: dL/dw1 = {dL_dw1:.4f}, dL/dw2 = {dL_dw2:.4f}, dL/db1 = {dL_db1:.4f}")
        
        return {
            'gradients': {
                'dL_dw1': dL_dw1, 'dL_dw2': dL_dw2, 'dL_dw3': dL_dw3,
                'dL_db1': dL_db1, 'dL_db2': dL_db2
            },
            'activations': {'a1': a1, 'a2': a2},
            'loss': loss
        }

# Demonstrate backpropagation
visualizer = BackpropagationVisualizer()
# result = visualizer.demonstrate_gradient_calculation()
```

## Common Problems and Solutions

### 1. Vanishing Gradient Problem

```python
def demonstrate_vanishing_gradients():
    """Show how gradients vanish in deep networks with sigmoid"""
    
    # Deep network with sigmoid activations
    layers = [784, 100, 100, 100, 100, 10]  # Very deep
    
    # Initialize with standard normal distribution (bad for deep networks)
    weights = []
    for i in range(len(layers) - 1):
        w = np.random.randn(layers[i], layers[i+1])  # Standard initialization
        weights.append(w)
    
    # Simulate forward pass
    x = np.random.randn(1, 784)
    activations = [x]
    
    for w in weights:
        z = np.dot(activations[-1], w)
        a = 1 / (1 + np.exp(-np.clip(z, -500, 500)))  # Sigmoid
        activations.append(a)
    
    # Simulate backward pass - calculate gradient magnitudes
    gradient_magnitudes = []
    dL_da = np.ones_like(activations[-1])  # Assume unit gradient from loss
    
    for i in reversed(range(len(weights))):
        # Sigmoid derivative
        da_dz = activations[i+1] * (1 - activations[i+1])
        dL_dz = dL_da * da_dz
        
        # Gradient magnitude
        grad_magnitude = np.mean(np.abs(dL_dz))
        gradient_magnitudes.append(grad_magnitude)
        
        # Backpropagate
        dL_da = np.dot(dL_dz, weights[i].T)
    
    gradient_magnitudes.reverse()
    
    plt.figure(figsize=(10, 6))
    plt.plot(range(1, len(gradient_magnitudes) + 1), gradient_magnitudes, 'bo-')
    plt.title('Gradient Magnitudes Across Layers (Vanishing Gradient Problem)')
    plt.xlabel('Layer')
    plt.ylabel('Average Gradient Magnitude')
    plt.yscale('log')
    plt.grid(True)
    plt.show()
    
    return gradient_magnitudes

# demonstrate_vanishing_gradients()
```

### 2. Solutions to Common Problems

```python
class ImprovedNeuralNetwork(NeuralNetwork):
    def __init__(self, layers, activation='relu', output_activation='sigmoid', 
                 learning_rate=0.01, optimizer='adam', dropout_rate=0.0,
                 batch_norm=False):
        super().__init__(layers, activation, output_activation, learning_rate, optimizer)
        self.dropout_rate = dropout_rate
        self.batch_norm = batch_norm
        self.training = True
        
        if batch_norm:
            self.init_batch_norm()
    
    def init_batch_norm(self):
        """Initialize batch normalization parameters"""
        self.gamma = [np.ones((1, layer)) for layer in self.layers[1:-1]]
        self.beta = [np.zeros((1, layer)) for layer in self.layers[1:-1]]
        self.running_mean = [np.zeros((1, layer)) for layer in self.layers[1:-1]]
        self.running_var = [np.ones((1, layer)) for layer in self.layers[1:-1]]
    
    def batch_normalize(self, x, layer_idx, epsilon=1e-8):
        """Apply batch normalization"""
        if self.training:
            mean = np.mean(x, axis=0, keepdims=True)
            var = np.var(x, axis=0, keepdims=True)
            
            # Update running statistics
            momentum = 0.9
            self.running_mean[layer_idx] = (momentum * self.running_mean[layer_idx] + 
                                          (1 - momentum) * mean)
            self.running_var[layer_idx] = (momentum * self.running_var[layer_idx] + 
                                         (1 - momentum) * var)
        else:
            mean = self.running_mean[layer_idx]
            var = self.running_var[layer_idx]
        
        # Normalize
        x_norm = (x - mean) / (np.sqrt(var) + epsilon)
        
        # Scale and shift
        return self.gamma[layer_idx] * x_norm + self.beta[layer_idx]
    
    def dropout(self, x, rate):
        """Apply dropout regularization"""
        if self.training and rate > 0:
            mask = np.random.binomial(1, 1-rate, x.shape) / (1-rate)
            return x * mask
        return x
    
    def forward(self, X):
        """Forward propagation with batch normalization and dropout"""
        self.activations = [X]
        self.z_values = []
        self.batch_norm_cache = []
        
        activation = X
        
        for i in range(len(self.weights)):
            z = np.dot(activation, self.weights[i]) + self.biases[i]
            self.z_values.append(z)
            
            # Apply batch normalization (except output layer)
            if self.batch_norm and i < len(self.weights) - 1:
                z_norm = self.batch_normalize(z, i)
                self.batch_norm_cache.append(z_norm)
                z = z_norm
            
            # Apply activation
            if i == len(self.weights) - 1:  # Output layer
                if self.output_activation == 'softmax':
                    activation = self.softmax(z)
                elif self.output_activation == 'sigmoid':
                    activation = self.sigmoid(z)
                else:
                    activation = z
            else:  # Hidden layers
                if self.activation == 'relu':
                    activation = self.relu(z)
                elif self.activation == 'tanh':
                    activation = self.tanh(z)
                else:
                    activation = self.sigmoid(z)
                
                # Apply dropout
                activation = self.dropout(activation, self.dropout_rate)
            
            self.activations.append(activation)
        
        return activation
    
    def set_training(self, training):
        """Set training mode"""
        self.training = training
```

## Key Concepts Summary

### 1. Universal Approximation Theorem
Neural networks with at least one hidden layer can approximate any continuous function to arbitrary accuracy, given sufficient neurons.

### 2. Bias-Variance Tradeoff
- **High Bias**: Underfitting (too simple model)
- **High Variance**: Overfitting (too complex model)
- **Goal**: Find the sweet spot with good generalization

### 3. Regularization Techniques
- **L1/L2 Regularization**: Add penalty terms to loss function
- **Dropout**: Randomly set neurons to zero during training
- **Batch Normalization**: Normalize inputs to each layer
- **Early Stopping**: Stop training when validation loss stops improving

### 4. Optimization Challenges
- **Local Minima**: Gradient descent can get stuck
- **Saddle Points**: Points where gradient is zero but not optimal
- **Vanishing/Exploding Gradients**: Gradients become too small or large

## Best Practices

### 1. Data Preprocessing
```python
def preprocess_data(X, y):
    """Best practices for data preprocessing"""
    
    # Normalize features
    from sklearn.preprocessing import StandardScaler
    scaler = StandardScaler()
    X_normalized = scaler.fit_transform(X)
    
    # Handle categorical variables
    from sklearn.preprocessing import LabelEncoder, OneHotEncoder
    
    # Split data properly
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(
        X_normalized, y, test_size=0.2, random_state=42, stratify=y
    )
    
    return X_train, X_test, y_train, y_test, scaler
```

### 2. Hyperparameter Tuning
```python
def tune_hyperparameters():
    """Example hyperparameter search"""
    
    hyperparams = {
        'learning_rates': [0.001, 0.01, 0.1],
        'hidden_sizes': [[32], [64], [32, 16], [64, 32]],
        'activations': ['relu', 'tanh'],
        'optimizers': ['sgd', 'adam']
    }
    
    best_score = 0
    best_params = None
    
    for lr in hyperparams['learning_rates']:
        for hidden in hyperparams['hidden_sizes']:
            for activation in hyperparams['activations']:
                for optimizer in hyperparams['optimizers']:
                    # Create network
                    layers = [input_size] + hidden + [output_size]
                    nn = NeuralNetwork(
                        layers=layers,
                        activation=activation,
                        learning_rate=lr,
                        optimizer=optimizer
                    )
                    
                    # Train and evaluate
                    # ... training code ...
                    
                    # If score is better, update best params
                    # ...
    
    return best_params
```

## Conclusion

Neural networks are powerful tools for machine learning, but they require careful design and training. Key takeaways:

1. **Start Simple**: Begin with simple architectures and gradually increase complexity
2. **Preprocess Data**: Normalize inputs and handle categorical variables properly
3. **Choose Appropriate Activations**: ReLU for hidden layers, sigmoid/softmax for output
4. **Regularize**: Use dropout, batch normalization, or early stopping to prevent overfitting
5. **Monitor Training**: Track both training and validation metrics
6. **Experiment**: Try different architectures, optimizers, and hyperparameters

Understanding these fundamentals will prepare you for more advanced topics like convolutional neural networks, recurrent neural networks, and transformer architectures. The principles of forward propagation, backpropagation, and gradient-based optimization remain consistent across all neural network architectures.

Practice implementing these concepts from scratch to truly understand how neural networks work. This foundation will make it easier to use high-level frameworks like TensorFlow and PyTorch effectively.
