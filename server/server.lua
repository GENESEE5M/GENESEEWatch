local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
local Tools = module("vrp", "lib/Tools")

vRP = Proxy.getInterface("vRP")

Watch = {}
Tunnel.bindInterface("GENESEEWatch", Watch)
Proxy.addInterface("GENESEEWatch", Watch)

local List = {}

function Watch.CheckItem()
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        if vRP.getInventoryItemAmount(user_id, Config.ItemName) >= 1 then
            return true
        else
            TriggerClientEvent("Notify", source, "Importante", Config.NeedItemText)
            return false
        end
    end
end

function Watch.CheckPermission()
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        if Config.MusicPermission then
            if vRP.hasPermission(user_id, Config.MusicPermissionType) then
                return true
            else
                TriggerClientEvent("Notify", source, "Negado", Config.MusicPermissionText)
                return false
            end
        else
            return true
        end
    end
end

function Watch.Identity()
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        local identity = vRP.getUserIdentity(user_id)
        local job = vRP.getUserGroupByType(user_id, 'hie')

        if job == '' then
            job = 'Desempregado'
        end

        local cnh = 'Inválido'
        if identity.driverlicense == 0 then
            cnh = 'Não habilitado'
        elseif identity.driverlicense == 1 then
            cnh = 'Habilitado'
        elseif identity.driverlicense == 3 then
            cnh = 'Cassada'
        end

        if identity then
            return identity.name, identity.firstname, identity.user_id, identity.registration, job, cnh, identity.phone
        end
    end
end

function Watch.listMusic()
    local source = source

    local link = vRP.prompt(source, "LINK DO YOUTUBE", "")

    if link == "" then
        return
    end

    return "List", link

end
