package com.paulmethfessel.kyubcraft;

import com.paulmethfessel.kyubcraft.init.ModItemGroup;
import net.minecraft.item.Item;

public class ItemKyub extends Item {
    private static final String NAME = "item_kyub";

    public ItemKyub() {
        super(new Item.Properties()
            .group(ModItemGroup.KYUB_GROUP));
        setRegistryName(KyubCraft.MODID, NAME);
    }
}
