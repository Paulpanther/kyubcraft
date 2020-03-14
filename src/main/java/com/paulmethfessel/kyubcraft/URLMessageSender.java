package com.paulmethfessel.kyubcraft;

import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.util.math.BlockPos;
import net.minecraftforge.common.ForgeHooks;

import java.util.List;

public class URLMessageSender {

    public static final String BASE_URL = "https://paulmethfessel.com/kyubcraft/convert#";

    public static void encodeAndSend(PlayerEntity player, List<BlockPos> positions) {
        String url = encode(positions);
        player.sendMessage(ForgeHooks.newChatWithLinks(url));
    }

    public static String encode(List<BlockPos> positions) {
        StringBuilder builder = new StringBuilder();
        builder.append(BASE_URL);
        for (BlockPos pos : positions) {
            builder.append(pos.getX());
            builder.append(".");
            builder.append(pos.getY());
            builder.append(".");
            builder.append(pos.getZ());
            builder.append(";");
        }
        return builder.toString();
    }
}
