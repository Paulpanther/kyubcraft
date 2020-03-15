package com.paulmethfessel.kyubcraft;

import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.util.math.BlockPos;
import net.minecraftforge.common.ForgeHooks;

import java.math.BigInteger;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class URLMessageSender {

    public static final String BASE_URL = "https://kyubcraft.paulmethfessel.com#";

    public static void encodeAndSend(PlayerEntity player, List<BlockPos> positions) {
        if (positions.size() == 0) return;

        List<BlockPos> positivePositions = onlyPositiveValues(positions);
        String url = encode(positivePositions);
        String shortUrl = shorten(url);
        player.sendMessage(ForgeHooks.newChatWithLinks(BASE_URL + shortUrl));
    }

    private static String encode(List<BlockPos> positions) {
    	return String.join("b",
                positions.stream().map(URLMessageSender::encode).toArray(String[]::new));
    }

    private static String encode(BlockPos pos) {
        return String.format("%da%da%d", pos.getX(), pos.getY(), pos.getZ());
    }

    private static String shorten(String message) {
    	BigInteger longMessage = new BigInteger(message, 16);
        return Base64.getEncoder().encodeToString(longMessage.toByteArray());
    }

    private static List<BlockPos> onlyPositiveValues(List<BlockPos> positions) {
        BlockPos min = findMinimum(positions);
        return positions.stream().map(p -> p.subtract(min)).collect(Collectors.toList());
    }

    private static BlockPos findMinimum(List<BlockPos> positions) {
    	int minX = positions.get(0).getX();
        int minY = positions.get(0).getY();
        int minZ = positions.get(0).getZ();
        for (int i = 1; i < positions.size(); i++) {
            if (positions.get(i).getX() < minX) minX = positions.get(i).getX();
            if (positions.get(i).getY() < minY) minY = positions.get(i).getY();
            if (positions.get(i).getZ() < minZ) minZ = positions.get(i).getZ();
        }
        return new BlockPos(minX, minY, minZ);
    }
}
