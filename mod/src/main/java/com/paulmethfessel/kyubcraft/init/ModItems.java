package com.paulmethfessel.kyubcraft.init;

import com.paulmethfessel.kyubcraft.ItemKyub;
import com.paulmethfessel.kyubcraft.KyubCraft;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraftforge.registries.ObjectHolder;

@ObjectHolder(KyubCraft.MODID)
public class ModItems {
    public static final ItemKyub ITEM_KYUB = new ItemKyub();
    public static final BlockItem ITEM_PLYWOOD = ModBlocks.BLOCK_PLYWOOD.toBlockItem();
}
