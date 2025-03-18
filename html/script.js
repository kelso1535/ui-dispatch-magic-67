
let isVisible = false;
let callsData = [];

// Listen for messages from the game client
window.addEventListener('message', function(event) {
    const item = event.data;
    
    if (item.type === 'toggleUI') {
        toggleDispatchUI(item.show);
    } else if (item.type === 'newCall') {
        addNewCall(item.data);
        showNotification(item.data);
    } else if (item.type === 'playSound') {
        playSound(item.sound);
    }
});

// Toggle dispatch UI visibility
function toggleDispatchUI(show) {
    isVisible = show;
    document.getElementById('dispatch-container').style.display = show ? 'block' : 'none';
}

// Add a new dispatch call to the UI
function addNewCall(callData) {
    callsData.unshift(callData); // Add to beginning of array
    updateCallsUI();
}

// Update the calls container UI
function updateCallsUI() {
    const container = document.getElementById('calls-container');
    container.innerHTML = '';
    
    callsData.forEach(call => {
        const callCard = document.createElement('div');
        callCard.className = `call-card ${call.type.toLowerCase()}`;
        if (call.type === 'EMERGENCY' || call.type === 'DURESS') {
            callCard.classList.add('flash');
        }
        
        callCard.innerHTML = `
            <div class="call-header">
                <span class="call-id">#${call.id}</span>
                <span class="call-time">${call.time}</span>
            </div>
            <div class="call-type">${call.type}</div>
            <div class="call-details">${call.details}</div>
            <div class="call-phone">Caller: ${call.callerPhone}</div>
            <div class="call-actions">
                <button class="btn-waypoint" data-coords='${JSON.stringify(call.coords)}'>Set Waypoint</button>
                <button class="btn-respond">Respond</button>
            </div>
        `;
        
        container.appendChild(callCard);
        
        // Add event listener to set waypoint button
        const waypointBtn = callCard.querySelector('.btn-waypoint');
        waypointBtn.addEventListener('click', function() {
            const coords = JSON.parse(waypointBtn.getAttribute('data-coords'));
            fetch('https://dispatch-system/setWaypoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ coords: coords })
            });
        });
        
        // Add event listener to respond button
        const respondBtn = callCard.querySelector('.btn-respond');
        respondBtn.addEventListener('click', function() {
            // Remove flashing effect when officer responds
            callCard.classList.remove('flash');
        });
    });
}

// Show notification for new dispatch call
function showNotification(callData) {
    const notification = document.createElement('div');
    notification.className = `notification ${callData.type.toLowerCase()}`;
    
    notification.innerHTML = `
        <div>${callData.type}</div>
        <div>${callData.details}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove notification after duration
    setTimeout(() => {
        notification.classList.add('fadeOut');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Play sound effect
function playSound(sound) {
    const audioElement = document.getElementById(`sound-${sound}`);
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play().catch(error => console.error('Audio play failed:', error));
    }
}

// Close button functionality
document.getElementById('close-btn').addEventListener('click', function() {
    fetch('https://dispatch-system/close', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({})
    });
    toggleDispatchUI(false);
});

// Escape key to close the UI
document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape' && isVisible) {
        fetch('https://dispatch-system/close', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({})
        });
        toggleDispatchUI(false);
    }
});
