package com.paulmethfessel.kyubcraft;

import net.minecraft.block.Block;
import net.minecraft.block.material.Material;

public class BlockPlywood extends Block {
    private static final String NAME = "block_plywood";

    public BlockPlywood() {
        super(Block.Properties
                .create(Material.WOOD)
                .hardnessAndResistance(3, 3));
        setRegistryName(KyubCraft.MODID, NAME);
    }
}
