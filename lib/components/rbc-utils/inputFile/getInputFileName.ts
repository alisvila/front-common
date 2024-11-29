import getInputFileData from "./getInputFileData";

function getInputFileName(e:any) {
  return getInputFileData(e)?.name?.split('.')[0]
}

export default getInputFileName;