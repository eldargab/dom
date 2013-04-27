test: build
	@open ./test/index.html

build:
	@component build --dev

install:
	@npm install component
	@component install --dev

.PHONY: install build test
