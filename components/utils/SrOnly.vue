<script setup lang="ts"></script>

<template>
	<span><slot /></span>
</template>

<style lang="scss" scoped>
span {
	position: absolute;
	overflow: hidden;
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	border: 0;
}
</style>
