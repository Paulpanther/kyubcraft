import {Vector3} from 'three';

export async function parseWe(file: File): Promise<Vector3[]> {
    let content = await file.text();
    const firstBracket = content.indexOf("{");
    content = content.substring(firstBracket);
    content = content.replaceAll("[", "");
    content = content.replaceAll("]", "");
    content = content.replaceAll(" =", ":");
    content = "[" + content.substr(1, content.length - 2) + "]";
    try {
        const blocks = JSON.parse(content);
        return blocks.map(block => new Vector3(block.x, block.y, block.z));
    } catch (e) {
        console.log(content);
        alert(`Error parsing file: ${e.toString()}`)
        return null;
    }
}
