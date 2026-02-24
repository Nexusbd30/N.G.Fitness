from fastapi import FastAPI

app = FastAPI(title="N.G.Fitness API", version="0.1.0")


@app.get("/", tags=["root"])
async def root() -> dict[str, str]:
    return {"message": "N.G.Fitness backend is running"}


@app.get("/health", tags=["health"])
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
