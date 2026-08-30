import { useEffect, useState } from "react";
import { DISCORD_ID } from "../../content/socials";

type Presence = {
    displayName: string;
    avatarUrl: string | null;
    decorationUrl: string | null;
    guildTag: { label: string; badgeUrl: string } | null;
    customStatus: string | null;
    activity: string | null;
};

// Activity type 4 is the freeform "custom status" — its text lives in `state`,
// not `name`, and it isn't something they're actually doing.
const CUSTOM_STATUS = 4;

/**
 * Lanyard exposes live presence for users who've joined its server, and carries
 * more of the profile than it first appears — the avatar decoration and guild tag
 * both come through. Bio, pronouns and the animated profile effect are auth-gated
 * and genuinely unavailable.
 */
const DiscordCard = () => {
    const [presence, setPresence] = useState<Presence | null>(null);

    useEffect(() => {
        let active = true;
        fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
            .then(res => (res.ok ? res.json() : Promise.reject(new Error("not monitored"))))
            .then(payload => {
                if (!active || !payload?.success) return;
                const data = payload.data;
                const user = data.discord_user;
                const activities: { type: number; name?: string; state?: string }[] = data.activities ?? [];
                const guild = user.primary_guild;

                setPresence({
                    displayName: user.global_name ?? user.display_name ?? user.username,
                    avatarUrl: user.avatar
                        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
                        : null,
                    decorationUrl: user.avatar_decoration_data?.asset
                        ? `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=160&passthrough=true`
                        : null,
                    guildTag: guild?.tag
                        ? {
                              label: guild.tag,
                              badgeUrl: `https://cdn.discordapp.com/guild-tag-badges/${guild.identity_guild_id}/${guild.badge}.png?size=32`,
                          }
                        : null,
                    customStatus: activities.find(a => a.type === CUSTOM_STATUS)?.state ?? null,
                    activity: activities.find(a => a.type !== CUSTOM_STATUS)?.name ?? null,
                });
            })
            .catch(() => {
                /* Presence is optional; the fallback below still links out. */
            });
        return () => {
            active = false;
        };
    }, []);

    if (!presence) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-white">
                <img src="/assets/other/discord.png" alt="" className="h-10 w-10" />
                <span className="font-mono text-sm text-white/80">letsbecool</span>
            </div>
        );
    }

    return (
        <div className="flex h-full min-h-0 flex-col items-center justify-center gap-2 text-center text-white">
            {/* Sized as the decoration frame; the avatar sits at 76% inside it, which
                is roughly the ratio Discord itself uses. */}
            <div className="relative h-32 w-32 shrink-0">
                {presence.avatarUrl && (
                    <img
                        src={presence.avatarUrl}
                        alt=""
                        className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    />
                )}
                {presence.decorationUrl && (
                    <img src={presence.decorationUrl} alt="" className="absolute inset-0 h-full w-full" />
                )}
            </div>

            <div className="flex shrink-0 items-center justify-center gap-2">
                <p className="font-serif text-lg font-bold leading-none">{presence.displayName}</p>
                {presence.guildTag && (
                    <span className="flex items-center gap-1 rounded bg-black/25 px-1.5 py-0.5">
                        <img src={presence.guildTag.badgeUrl} alt="" className="h-3.5 w-3.5" />
                        <span className="font-mono text-[10px] font-bold">{presence.guildTag.label}</span>
                    </span>
                )}
            </div>

            {(presence.activity ?? presence.customStatus) && (
                <p className="max-w-full shrink-0 truncate px-2 font-mono text-xs text-white/75">
                    {presence.activity ? `Playing ${presence.activity}` : presence.customStatus}
                </p>
            )}
        </div>
    );
};

export default DiscordCard;
