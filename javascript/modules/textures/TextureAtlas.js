class TextureAtlas {

    BaseTexture;

    Textures = {};

    TextureAtlasData;

    constructor(pixi_basetexture, data){

        this.BaseTexture = pixi_basetexture;

        this.TextureAtlasData = data;
        console.log(this.TextureAtlasData);
        let textureAtlasKeys = Object.keys(data);
        textureAtlasKeys.forEach((key) => {

            console.log("Key = " + key);
            let textureStripData = this.TextureAtlasData[key];
            
            let textureStripKeys = Object.keys(textureStripData);
            textureStripKeys.forEach((strip_key) => {

                if(strip_key != "Frames"){
                    //Create Texture for this frame and store it in textures
                    this.CreateNewSubtexture(key, strip_key, textureStripData[strip_key]);
                }

            });
        });

    }


    CreateNewSubtexture(texstrip_name, strip_key, subtex_data){
        
        let textureName = texstrip_name + strip_key;

        if(!this.Textures.hasOwnProperty(textureName)){
            //A subtetxure by this name did not already exist, and is now good to be created
            console.log("New subtetexture created by name: " + textureName);

            let subtex_width = (subtex_data.Right - subtex_data.Left) + 1;
            let subtex_height = (subtex_data.Bottom - subtex_data.Top) + 1;
            let subtex_frame = new PIXI.Rectangle(subtex_data.Left, subtex_data.Top, subtex_width, subtex_height);

            let tex = new PIXI.Texture(this.BaseTexture, subtex_frame);
            tex.defaultAnchor = new PIXI.Point(0.5, 0.5);
            this.Textures[textureName] = tex;

        }

    }


}

export { TextureAtlas };