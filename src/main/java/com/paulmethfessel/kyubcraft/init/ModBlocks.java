package com.paulmethfessel.kyubcraft.init;

import com.paulmethfessel.kyubcraft.BlockPlywood;
import com.paulmethfessel.kyubcraft.KyubCraft;
import net.minecraft.block.Block;
import net.minecraftforge.registries.ObjectHolder;

@ObjectHolder(KyubCraft.MODID)
public class ModBlocks {
    public static final Block BLOCK_PLYWOOD = new BlockPlywood();

}
