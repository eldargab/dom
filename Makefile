test: build
	@open ./test/index.html

build: components
	@component build --dev

components: node_modules component.json
	@component install --dev

node_modules:
	@npm install component@0.16.7

clean:
	@rm -rf components build node_modules

.PHONY: build test clean
