export function getAssetById({assets}){
	if (assets){
		return (id) => {
			return (assets[id]) ? assets[id] : false;
		}
	}
}
