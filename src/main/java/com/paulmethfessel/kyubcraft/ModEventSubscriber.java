package com.paulmethfessel.kyubcraft;

import com.paulmethfessel.kyubcraft.init.ModBlocks;
import com.paulmethfessel.kyubcraft.init.ModItems;
import net.minecraft.block.Block;
import net.minecraft.item.Item;
import net.minecraftforge.event.RegistryEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;

@Mod.EventBusSubscriber(modid = KyubCraft.MODID, bus = Mod.EventBusSubscriber.Bus.MOD)
public class ModEventSubscriber {

    @SubscribeEvent
    public static void onRegisterItems(RegistryEvent.Register<Item> event) {
        event.getRegistry().registerAll(
                ModItems.ITEM_KYUB,
                ModItems.ITEM_PLYWOOD
        );
    }

    @SubscribeEvent
    public static void onRegisterBlocks(RegistryEvent.Register<Block> event) {
        event.getRegistry().registerAll(
                ModBlocks.BLOCK_PLYWOOD
        );
    }
}
