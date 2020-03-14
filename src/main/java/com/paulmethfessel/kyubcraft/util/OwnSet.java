package com.paulmethfessel.kyubcraft.util;

import org.jetbrains.annotations.NotNull;

import java.util.*;
import java.util.function.BiPredicate;
import java.util.stream.Collectors;

public class OwnSet<E> implements Set<E> {

	private List<E> elements;
	private BiPredicate<E, Object> equals;

	public OwnSet() {
		this(new ArrayList<>(), E::equals);
	}

	public OwnSet(Collection<E> elements) {
		this(elements, E::equals);
	}

	public OwnSet(BiPredicate<E, Object> equals) {
		this(new ArrayList<>(), equals);
	}

	public OwnSet(Collection<E> elements, BiPredicate<E, Object> equals) {
		this.elements = new ArrayList<>(elements);
		this.equals = equals;
	}

	@Override
	public int size() {
		return elements.size();
	}

	@Override
	public boolean isEmpty() {
		return elements.isEmpty();
	}

	@Override
	public boolean contains(Object o) {
		for (E e : elements) {
			if (this.equals.test(e, o)) {
				return true;
			}
		}
		return false;
	}

	@Override
	@NotNull
	public Iterator<E> iterator() {
		return elements.iterator();
	}

	@Override
	@NotNull
	public Object[] toArray() {
		return elements.toArray();
	}

	@Override
	@NotNull
	public <T> T[] toArray(@NotNull T[] a) {
		return elements.toArray(a);
	}

	@Override
	public boolean add(E e) {
		if (!contains(e)) {
			elements.add(e);
			return true;
		}
		return false;
	}

	@Override
	public boolean remove(Object o) {
		return elements.remove(o);
	}

	@Override
	public boolean containsAll(@NotNull Collection<?> c) {
		for (Object e : c) {
			if (!contains(e)) {
				return false;
			}
		}
		return true;
	}

	@Override
	public boolean addAll(@NotNull Collection<? extends E> c) {
		int originalSize = elements.size();
		c.forEach(this::add);
		return originalSize != elements.size();
	}

	@Override
	public boolean retainAll(@NotNull Collection<?> c) {
		int originalSize = elements.size();
		elements = elements.stream().filter(c::contains).collect(Collectors.toList());
		return originalSize != elements.size();
	}

	@Override
	public boolean removeAll(@NotNull Collection<?> c) {
		int originalSize = elements.size();
		elements = elements.stream().filter(e -> !c.contains(e)).collect(Collectors.toList());
		return originalSize != elements.size();
	}

	@Override
	public void clear() {
		elements.clear();
	}

	public OwnSet<E> copy() {
		return new OwnSet<>(elements, equals);
	}

	@SafeVarargs
	public static <E> OwnSet<E> concat(Collection<E> ... collections) {
		OwnSet<E> set = new OwnSet<>();
		Arrays.asList(collections).forEach(set::addAll);
		return set;
	}
}
