# ShipIt Palette · build & deploy automation
# usage:  make help

.PHONY: help install dev build preview clean deploy deploy-preview \
        link unlink open analytics version-patch version-minor version-major \
        ship lint check status logs

PKG_VERSION := $(shell node -p "require('./package.json').version")
PROJECT_NAME := shipit-palette

help:
	@echo "ShipIt Palette · v$(PKG_VERSION)"
	@echo ""
	@echo "Build & run:"
	@echo "  make install          Install dependencies"
	@echo "  make dev              Start dev server (Vite)"
	@echo "  make build            Production build → dist/"
	@echo "  make preview          Preview the production build"
	@echo "  make clean            Remove node_modules + dist"
	@echo ""
	@echo "Deploy:"
	@echo "  make deploy           Deploy to production (shipit-palette.vercel.app)"
	@echo "  make deploy-preview   Deploy a preview URL"
	@echo "  make link             Link this folder to the Vercel project"
	@echo "  make open             Open the live site in browser"
	@echo "  make analytics        Show analytics dashboard URL"
	@echo "  make logs             Stream production runtime logs"
	@echo ""
	@echo "Version:"
	@echo "  make version-patch    Bump patch version (1.0.0 → 1.0.1)"
	@echo "  make version-minor    Bump minor version (1.0.0 → 1.1.0)"
	@echo "  make version-major    Bump major version (1.0.0 → 2.0.0)"
	@echo "  make ship             Bump patch + commit + push + deploy"
	@echo ""
	@echo "Status:"
	@echo "  make status           Show git status, current version, last deploy"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview: build
	npm run preview

clean:
	rm -rf node_modules dist .vite

# --- Vercel ---

link:
	vercel link --project $(PROJECT_NAME) --yes

deploy:
	@echo "→ Deploying $(PROJECT_NAME) v$(PKG_VERSION) to production…"
	vercel deploy --prod --yes

deploy-preview:
	vercel deploy --yes

open:
	open https://$(PROJECT_NAME).vercel.app

analytics:
	@echo "Analytics: https://vercel.com/dashboard/$(PROJECT_NAME)/analytics"
	@echo "Speed Insights: https://vercel.com/dashboard/$(PROJECT_NAME)/speed-insights"

logs:
	vercel logs https://$(PROJECT_NAME).vercel.app --follow

# --- Versioning (uses npm version: bumps + tags) ---

version-patch:
	npm version patch -m "chore(release): v%s"
	@echo "→ Bumped to v$$(node -p 'require(\"./package.json\").version'). Run 'make ship' or 'git push --follow-tags'."

version-minor:
	npm version minor -m "chore(release): v%s"

version-major:
	npm version major -m "chore(release): v%s"

ship: version-patch
	git push --follow-tags origin main
	$(MAKE) deploy

# --- Status ---

status:
	@echo "📦 Version : $(PKG_VERSION)"
	@echo "🌳 Branch  : $$(git rev-parse --abbrev-ref HEAD)"
	@echo "🔖 Last tag: $$(git describe --tags --abbrev=0 2>/dev/null || echo 'none')"
	@echo ""
	@git status --short
