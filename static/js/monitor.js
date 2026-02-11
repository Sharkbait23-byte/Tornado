// Data structures to hold chart data
const maxDataPoints = 20;
const chartOptions = {
    responsive: true,
    animation: {
        duration: 0
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.05)'
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    },
    elements: {
        point: {
            radius: 2
        },
        line: {
            tension: 0.3
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

const cpuData = {
    labels: [],
    datasets: [{
        label: 'CPU Usage (%)',
        data: [],
        borderColor: '#409eff',
        backgroundColor: 'rgba(64, 158, 255, 0.1)',
        fill: true
    }]
};

const memoryData = {
    labels: [],
    datasets: [{
        label: 'Memory Usage (%)',
        data: [],
        borderColor: '#67c23a',
        backgroundColor: 'rgba(103, 194, 58, 0.1)',
        fill: true
    }]
};

const processesData = {
    labels: [],
    datasets: [{
        label: 'Number of Processes',
        data: [],
        borderColor: '#909399',
        backgroundColor: 'rgba(144, 147, 153, 0.1)',
        fill: true
    }]
};

const responseTimeData = {
    labels: [],
    datasets: [{
        label: 'Response Time (ms)',
        data: [],
        borderColor: '#e6a23c',
        backgroundColor: 'rgba(230, 162, 60, 0.1)',
        fill: true
    }]
};

// Chart configuration
const chartConfig = {
    type: 'line',
    options: chartOptions
};

// Initialize charts
let cpuChart, memoryChart, processesChart, responseTimeChart;

function initCharts() {
    cpuChart = new Chart(
        document.getElementById('cpuChart').getContext('2d'),
        {...chartConfig, data: cpuData}
    );
    
    memoryChart = new Chart(
        document.getElementById('memoryChart').getContext('2d'),
        {...chartConfig, data: memoryData}
    );
    
    processesChart = new Chart(
        document.getElementById('processesChart').getContext('2d'),
        {...chartConfig, data: processesData}
    );
    
    responseTimeChart = new Chart(
        document.getElementById('responseTimeChart').getContext('2d'),
        {...chartConfig, data: responseTimeData}
    );
}

// Update charts with new data
function updateChart(chart, data, value) {
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0') + ':' + 
                       now.getSeconds().toString().padStart(2, '0');
    
    data.labels.push(timeString);
    data.datasets[0].data.push(value);
    
    if (data.labels.length > maxDataPoints) {
        data.labels.shift();
        data.datasets[0].data.shift();
    }
    
    chart.update();
}

// WebSocket connection
let socket;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
const reconnectInterval = 3000;

function connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.hostname + (window.location.port ? `:${window.location.port}` : '');
    socket = new WebSocket(`${protocol}${host}/ws`);
    
    socket.onopen = function() {
        console.log('WebSocket connection established');
        document.getElementById('connectionStatus').textContent = 'Conectado';
        document.getElementById('connectionDot').classList.remove('disconnected');
        document.getElementById('connectionDot').classList.add('connected');
        reconnectAttempts = 0;
        
        // Remove empty state if it exists
        const emptyState = document.querySelector('.empty-state');
        if (emptyState && document.querySelectorAll('.event-item').length > 0) {
            emptyState.remove();
        }
    };
    
    socket.onclose = function() {
        console.log('WebSocket connection closed');
        document.getElementById('connectionStatus').textContent = 'Desconectado';
        document.getElementById('connectionDot').classList.remove('connected');
        document.getElementById('connectionDot').classList.add('disconnected');
        
        // Attempt to reconnect
        if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            setTimeout(connectWebSocket, reconnectInterval);
            console.log(`Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})...`);
        }
    };
    
    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };
    
    socket.onmessage = function(event) {
        handleWebSocketMessage(event.data);
    };
}

function handleWebSocketMessage(message) {
    try {
        // Parse the message as JSON
        const data = JSON.parse(message);
        
        // Handle different message types
        if (data.type === 'performance') {
            // Update performance charts
            if (data.cpu !== undefined) updateChart(cpuChart, cpuData, data.cpu);
            if (data.memory !== undefined) updateChart(memoryChart, memoryData, data.memory);
            if (data.processes !== undefined) updateChart(processesChart, processesData, data.processes);
            if (data.responseTime !== undefined) updateChart(responseTimeChart, responseTimeData, data.responseTime);
            return;
        }
        
        // For other message types, add to event list
        const messageType = data.type || 'info';
        const messageContent = data.message || 'No message content';
        const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
        
        // Add responseTime to chart if available
        if (data.responseTime) {
            updateChart(responseTimeChart, responseTimeData, parseFloat(data.responseTime));
        }
        
        addEventToList(messageContent, messageType, timestamp);
        
    } catch (e) {
        // If parsing fails, handle as plain text
        console.error('Error parsing message:', e);
        addEventToList(message.toString(), 'info', new Date());
    }
}

function getEventIcon(type) {
    switch (type) {
        case 'login':
            return '<i class="fas fa-sign-in-alt event-icon login"></i>';
        case 'logout':
            return '<i class="fas fa-sign-out-alt event-icon logout"></i>';
        case 'error':
        case 'failed_login':
        case 'query_error':
            return '<i class="fas fa-exclamation-triangle event-icon error"></i>';
        case 'ws_connection':
            return '<i class="fas fa-plug event-icon ws_connection"></i>';
        default:
            return '<i class="fas fa-info-circle event-icon info"></i>';
    }
}

function formatTimestamp(timestamp) {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function addEventToList(message, type = 'info', timestamp = new Date()) {
    const eventsContainer = document.getElementById('eventsContainer');
    
    // Remove empty state if it exists
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    const eventItem = document.createElement('div');
    eventItem.className = `event-item ${type}`;
    eventItem.dataset.type = type;
    
    const icon = getEventIcon(type);
    const formattedTime = formatTimestamp(timestamp);
    
    eventItem.innerHTML = `
        ${icon}
        <div class="event-content">${message}</div>
        <div class="event-timestamp">${formattedTime}</div>
    `;
    
    eventsContainer.prepend(eventItem);
    
    // Limit the number of events shown
    if (eventsContainer.children.length > 100) {
        eventsContainer.removeChild(eventsContainer.lastChild);
    }
}

function clearEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-stream"></i>
            <p>No hay eventos para mostrar</p>
        </div>
    `;
}

// Tab switching functionality
function initMonitoring() {
    // Initialize charts
    initCharts();
    
    // Connect to WebSocket
    connectWebSocket();
    
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const eventsContainer = document.getElementById('eventsContainer');
    const performanceCharts = document.getElementById('performanceCharts');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const tabName = this.getAttribute('data-tab');
            
            // Show/hide appropriate content
            if (tabName === 'rendimiento') {
                eventsContainer.style.display = 'none';
                performanceCharts.style.display = 'grid';
            } else {
                eventsContainer.style.display = 'block';
                performanceCharts.style.display = 'none';
                
                // Filter events based on tab
                const events = document.querySelectorAll('.event-item');
                events.forEach(event => {
                    const eventType = event.dataset.type;
                    
                    if (tabName === 'todos') {
                        event.style.display = 'flex';
                    } else if (tabName === eventType) {
                        event.style.display = 'flex';
                    } else {
                        event.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Reconnect button
    document.getElementById('reconnectBtn').addEventListener('click', function() {
        if (socket) {
            socket.close();
        }
        reconnectAttempts = 0;
        connectWebSocket();
    });
    
    // Clear button
    document.getElementById('clearBtn').addEventListener('click', function() {
        clearEvents();
    });
};

