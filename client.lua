
local isUiOpen = false
local playerData = {}

-- Initialize NUI callback
RegisterNUICallback('ready', function(data, cb)
    cb('ok')
end)

-- Handle key presses
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        
        -- Emergency Alert (E key)
        if IsControlJustReleased(0, 38) then -- E key
            local coords = GetEntityCoords(PlayerPedId())
            TriggerServerEvent('dispatch:emergency', {
                location = coords,
                type = 'EMERGENCY',
                details = 'Officer requesting immediate assistance'
            })
        end
        
        -- Duress Signal (D key)
        if IsControlJustReleased(0, 44) then -- D key
            local coords = GetEntityCoords(PlayerPedId())
            TriggerServerEvent('dispatch:duress', {
                location = coords,
                type = 'DURESS',
                details = 'Officer in distress'
            })
        end
        
        -- Backup Request (B key)
        if IsControlJustReleased(0, 29) then -- B key
            local coords = GetEntityCoords(PlayerPedId())
            TriggerServerEvent('dispatch:requestBackup', {
                location = coords,
                type = 'BACKUP',
                details = 'Officer requesting backup'
            })
        end
        
        -- Location Share (End key)
        if IsControlJustReleased(0, 177) then -- End key
            local coords = GetEntityCoords(PlayerPedId())
            TriggerServerEvent('dispatch:shareLoc', {
                location = coords,
                type = 'LOCATION',
                details = 'Officer sharing location'
            })
        end
    end
end)

-- Handle incoming dispatch calls
RegisterNetEvent('dispatch:receiveCall')
AddEventHandler('dispatch:receiveCall', function(data)
    SendNUIMessage({
        type = 'newCall',
        data = data
    })
end)

-- Toggle UI visibility
RegisterCommand('dispatch', function()
    isUiOpen = not isUiOpen
    SetNuiFocus(isUiOpen, isUiOpen)
    SendNUIMessage({
        type = 'toggleUI',
        show = isUiOpen
    })
end)

-- Register keybind for dispatch UI
RegisterKeyMapping('dispatch', 'Toggle Dispatch Interface', 'keyboard', 'DELETE')
