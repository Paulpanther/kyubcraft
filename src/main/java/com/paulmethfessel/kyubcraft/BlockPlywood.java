package com.paulmethfessel.kyubcraft;

import com.paulmethfessel.kyubcraft.init.ModBlocks;
import com.paulmethfessel.kyubcraft.init.ModItemGroup;
import com.paulmethfessel.kyubcraft.init.ModItems;
import net.minecraft.block.Block;
import net.minecraft.block.BlockState;
import net.minecraft.block.material.Material;
import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraft.util.ActionResultType;
import net.minecraft.util.Hand;
import net.minecraft.util.math.BlockPos;
import net.minecraft.util.math.BlockRayTraceResult;
import net.minecraft.world.World;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class BlockPlywood extends Block {
    private static final String NAME = "block_plywood";

    public BlockPlywood() {
        super(Block.Properties
                .create(Material.WOOD)
                .hardnessAndResistance(3, 3));
        setRegistryName(KyubCraft.MODID, NAME);
    }

    public BlockItem toBlockItem() {
        return (BlockItem) new BlockItem(
                this,
                new Item.Properties()
                        .group(ModItemGroup.KYUB_GROUP))
                .setRegistryName(KyubCraft.MODID, NAME);
    }

    @Override
    public ActionResultType onBlockActivated(BlockState state, World world, BlockPos pos, PlayerEntity player, Hand hand, BlockRayTraceResult traceResult) {
        List<Item> inHand = new ArrayList<>();
        player.getHeldEquipment().forEach(stack -> inHand.add(stack.getItem()));

        if (!world.isRemote && inHand.contains(ModItems.ITEM_KYUB)) {
            List<BlockPos> positions = findConnected(world, pos);
            URLMessageSender.encodeAndSend(player, positions);
        }
        return ActionResultType.PASS;
    }

    private static List<BlockPos> findConnected(World world, BlockPos pos) {
        return new ArrayList<>(findConnected(world, pos, new HashSet<>()));
    }

    private static Set<BlockPos> findConnected(World world, BlockPos pos, Set<BlockPos> found) {
        Set<BlockPos> newFound = new HashSet<>(found);
        newFound.add(pos);

        for (BlockPos neighborPos : getNeighbors(pos)) {
            BlockState neighbor = world.getBlockState(neighborPos);
            if (neighbor.getBlock() == ModBlocks.BLOCK_PLYWOOD &&
                    newFound.stream().noneMatch(currentPos -> currentPos.equals(neighborPos))) {
                newFound.addAll(findConnected(world, neighborPos, newFound));
            }
        }
        return newFound;
    }

    private static boolean blockPositionsEqual(BlockPos p1, BlockPos p2) {
        return p1.getX() == p2.getX() && p1.getY() == p2.getY() && p1.getZ() == p2.getZ();
    }

    private static BlockPos[] getNeighbors(BlockPos pos) {
        return new BlockPos[] {
                pos.add(0, 0, 1),
                pos.add(0, 0, -1),
                pos.add(0, 1, 0),
                pos.add(0, -1, 0),
                pos.add(1, 0, 0),
                pos.add(1, 0, 0),
        };
    }
}
