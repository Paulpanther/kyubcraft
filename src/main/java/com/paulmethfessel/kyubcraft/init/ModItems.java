package com.paulmethfessel.kyubcraft.init;

import com.paulmethfessel.kyubcraft.KyubCraft;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraftforge.registries.ObjectHolder;

@ObjectHolder(KyubCraft.MODID)
public class ModItems {
    public static final Item ITEM_KYUB = new Item(
            new Item.Properties()
            .group(ModItemGroup.KYUB_GROUP))
            .setRegistryName(KyubCraft.MODID, "item_kyub");

    public static final BlockItem ITEM_PLYWOOD = (BlockItem) new BlockItem(
            ModBlocks.BLOCK_PLYWOOD,
            new Item.Properties()
            .group(ModItemGroup.KYUB_GROUP))
            .setRegistryName(KyubCraft.MODID, ModBlocks.BLOCK_PLYWOOD.getRegistryName().getPath());
}
