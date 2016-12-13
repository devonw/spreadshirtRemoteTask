export const exampleImage = "https://image.spreadshirtmedia.com/image-server/v1/designs/2104687";

export const imageForDesign = (design) => {
  var resource = null;
  for(let r of design.resources){
    if(r.type === "error"){ continue; }
    if(resource === null || resource.type === "preview"){
      resource = r;
    }
    if(r.type === "montage"){ break; }
  }
  if(resource){
    return resource.href;
  }
  return exampleImage;
};
