<template>
	<span><slot /></span>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
span {
	position: absolute;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	border: 0;
}
</style>
