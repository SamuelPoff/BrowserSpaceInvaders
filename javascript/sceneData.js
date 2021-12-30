let PixiApplication;
let CollisionSystem;
let GameObjectPool;

function SetPixiApplication(app){
    PixiApplication = app;
}

function GetPixiApplication(){
    return PixiApplication;
}

function SetCollisionSystem(collision_system){
    CollisionSystem = collision_system;
}

function GetCollisionSystem(){
    return CollisionSystem;
}

function SetGameObjectPool(pool){
    GameObjectPool = pool;
}

function AddGameObject(object){
    GameObjectPool.push(object);
}

export {SetPixiApplication, GetPixiApplication, SetCollisionSystem, GetCollisionSystem, SetGameObjectPool, AddGameObject}