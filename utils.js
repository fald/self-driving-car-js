function lerp(A, B, t) {
    return A + (B - A) * t;
}


function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            };
        }
    }

    return null;
}


function polyIntersect(poly_1, poly_2) {
    // There's probably a better way...
    for (let i = 0; i < poly_1.length; i++) {
        for (let j = 0; j < poly_2.length - 1; j++) {
            const touch = getIntersection(
                poly_1[i],
                poly_1[(i + 1) % poly_1.length],
                poly_2[j],
                poly_2[(j + 1) % poly_2.length]
            )
            if (touch) {
                return true;
            }
        }
    }
    return false;
}


// Stolen without thought from the git project page.
function getRGBA(value){
    const alpha=Math.abs(value);
    const R=value<0?0:255;
    const G=R;
    const B=value>0?0:255;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}
