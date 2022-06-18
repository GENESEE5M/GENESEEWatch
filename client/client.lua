local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")

vRP = Proxy.getInterface("vRP")
Watch = Tunnel.getInterface("GENESEEWatch")

local onNui = false
local watch = false

local minimap = false

DisplayRadar(minimap)

local hour = 0
local minute = 0

local life = 0
local hunger = 100
local thirst = 100

xSound = exports.xsound

local musicID = "name"

RegisterNUICallback("action", function(data)
    local source = source
    local pos = GetEntityCoords(PlayerPedId())

    if data.action == "play" then
        if Watch.CheckPermission() then
            if xSound:soundExists(musicID) then
                if xSound:isPaused(musicID) then
                    xSound:Resume(musicID)
                end
            else
                local name, link = Watch.listMusic()

                xSound:PlayUrl(musicID, link, 0.1, 0)
            end
        end
    elseif data.action == "pause" then
        if Watch.CheckPermission() then
            if xSound:soundExists(musicID) then
                if xSound:isPlaying(musicID) then
                    xSound:Pause(musicID)
                end
            else
                TriggerEvent("Notify", "Negado", "Nenhuma musica tocando!")
            end
        end
    elseif data.action == "stop" then
        if Watch.CheckPermission() then
            if xSound:soundExists(musicID) then
                xSound:Destroy(musicID)
            else
                TriggerEvent("Notify", "Negado", "Nenhuma musica tocando!")
            end
        end
    elseif data.action == "volume-" then
        if Watch.CheckPermission() then
            if xSound:soundExists(musicID) then
                if xSound:isPlaying(musicID) then
                    xSound:setVolume(musicID, -0.1)
                end
            else
                TriggerEvent("Notify", "Negado", "Nenhuma musica tocando!")
            end
        end
    elseif data.action == "volume+" then
        if Watch.CheckPermission() then
            if xSound:soundExists(musicID) then
                if xSound:isPlaying(musicID) then
                    xSound:setVolume(musicID, 0.1)
                end
            else
                TriggerEvent("Notify", "Negado", "Nenhuma musica tocando!")
            end
        end
    elseif data.action == "timeplay" then
        if Watch.CheckPermission() then
            if xSound:soundExists(musicID) then
                local name, link = Watch.listMusic()

                xSound:PlayUrl(musicID, link, 0.1, 0)
            else
                TriggerEvent("Notify", "Negado", "Nenhuma musica tocando!")
            end
        end
    elseif data.action == "CloseNUI" then
        show()
    end
end)

RegisterNUICallback("GPS", function(data)
    if data.action == "acessar" then
        showGPS()
    end
end)

function baseSystem()
    if Config.basesystemType == 1 then

        RegisterNetEvent("vrp_hud:update")
        AddEventHandler("vrp_hud:update", function(rHunger, rThirst)
            hunger, thirst = 1.0 - (rHunger / 100), 1.0 - (rThirst / 100)
        end)

    elseif Config.basesystemType == 2 then

        RegisterNetEvent("hud:update")
        AddEventHandler("hud:update", function(rHunger, rThirst)
            hunger, thirst = rHunger, rThirst
        end)

    end
end

function calculateTimeDisplay()

    hour = GetClockHours()
    minute = GetClockMinutes()

    if hour <= 9 then
        hour = "0" .. hour
    end

    if minute <= 9 then
        minute = "0" .. minute
    end
end

function calculateTimeMusic()
    if xSound:soundExists(musicID) then
        played = xSound:getTimeStamp(musicID)
        total = xSound:getMaxDuration(musicID)
    end
end

function showGPS()
    DisplayRadar(true)
    Wait(Config.MiniMapDuration)
    DisplayRadar(false)
end

if Config.Command then
    RegisterCommand(Config.CommandControl, function(source, args, rawCommand)
        show()
    end)
end

if Config.Bind then
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(0)
            if IsControlJustPressed(1, Config.BindControl) then
                show()
            end
        end
    end)
end

function show()
    if Config.NeedItem then
        if Watch.CheckItem() then
            WatchOn()
        end
    else
        WatchOn()
    end
end

function WatchOn()
    local source = source

    local ped = PlayerPedId()
    local life = (GetEntityHealth(ped) - 100) / 300 * 100

    calculateTimeDisplay()
    calculateTimeMusic()

    baseSystem()

    onNui = not onNui

    local name, firsname, user_id, registration, job, cnh, phone = Watch.Identity()

    if onNui then
        SetNuiFocus(Config.Focus, Config.Cursor)
        SendNUIMessage({
            watch = true,

            hour = hour,
            minute = minute,

            life = life,
            hunger = hunger,
            thirst = thirst,

            name = name,
            firsname = firsname,
            user_id = user_id,
            registration = registration,
            job = job,
            cnh = cnh,
            phone = phone,

            total = total,
            played = played,

            vRP._playAnim(true, {{"anim@random@shop_clothes@watches", "idle_d"}}, true)

        })
    else
        SetNuiFocus(false)
        SendNUIMessage({
            watch = false,

            hour = hour,
            minute = minute,

            life = life,
            hunger = hunger,
            thirst = thirst,

            name = name,
            firsname = firsname,
            user_id = user_id,
            registration = registration,
            job = job,
            cnh = cnh,
            phone = phone,

            total = total,
            played = played,

            vRP._stopAnim(source, false)
        })
    end
end
