import {switchToPost} from './switchPage';
import {parseWe} from './weFileParser';
import {showVoxels} from './import';

const fileUpload = document.getElementById("file-upload") as HTMLInputElement;
fileUpload.addEventListener("change", async function () {
    const files = this.files;
    console.log("loaded file");

    if (files && files.length === 1) {
        const file = files[0];
        if (file.name.endsWith(".we")) {
            const voxels = await parseWe(file);
            if (voxels) {
                switchToPost();
                showVoxels(voxels);
            }
        } else {
            alert("Can only read .we files");
        }
    }
});
