package com.paulmethfessel.kyubcraft.init;

import com.paulmethfessel.kyubcraft.KyubCraft;
import net.minecraft.item.ItemGroup;
import net.minecraft.item.ItemStack;

import java.util.function.Supplier;

public class ModItemGroup extends ItemGroup {

    public static final ItemGroup KYUB_GROUP =
            new ModItemGroup(KyubCraft.MODID, () -> new ItemStack(ModItems.ITEM_KYUB));

    private final Supplier<ItemStack> icon;

    public ModItemGroup(final String name, final Supplier<ItemStack> icon) {
        super(name);
        this.icon = icon;
    }

    @Override
    public ItemStack createIcon() {
        return icon.get();
    }
}
