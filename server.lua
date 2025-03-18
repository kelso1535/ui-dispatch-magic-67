
-- Handle emergency alerts
RegisterServerEvent('dispatch:emergency')
AddEventHandler('dispatch:emergency', function(data)
    local source = source
    local coords = GetEntityCoords(GetPlayerPed(source))
    
    -- Add caller info
    data.callerPhone = '555-' .. math.random(1000, 9999)
    data.id = tostring(math.random(100, 999))
    data.time = os.date('%H:%M:%S')
    data.source = source
    data.coords = coords
    
    -- Broadcast to all players
    TriggerClientEvent('dispatch:receiveCall', -1, data)
end)

-- Handle duress signals
RegisterServerEvent('dispatch:duress')
AddEventHandler('dispatch:duress', function(data)
    local source = source
    local coords = GetEntityCoords(GetPlayerPed(source))
    
    data.callerPhone = '555-' .. math.random(1000, 9999)
    data.id = tostring(math.random(100, 999))
    data.time = os.date('%H:%M:%S')
    data.source = source
    data.coords = coords
    
    TriggerClientEvent('dispatch:receiveCall', -1, data)
end)

-- Handle backup requests
RegisterServerEvent('dispatch:requestBackup')
AddEventHandler('dispatch:requestBackup', function(data)
    local source = source
    local coords = GetEntityCoords(GetPlayerPed(source))
    
    data.callerPhone = '555-' .. math.random(1000, 9999)
    data.id = tostring(math.random(100, 999))
    data.time = os.date('%H:%M:%S')
    data.source = source
    data.coords = coords
    
    TriggerClientEvent('dispatch:receiveCall', -1, data)
end)

-- Handle location sharing
RegisterServerEvent('dispatch:shareLoc')
AddEventHandler('dispatch:shareLoc', function(data)
    local source = source
    local coords = GetEntityCoords(GetPlayerPed(source))
    
    data.callerPhone = '555-' .. math.random(1000, 9999)
    data.id = tostring(math.random(100, 999))
    data.time = os.date('%H:%M:%S')
    data.source = source
    data.coords = coords
    
    TriggerClientEvent('dispatch:receiveCall', -1, data)
end)
