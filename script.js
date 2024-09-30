function openProfile(name, birthDate, hobby, favoriteMovie, idol) {
    const profileUrl = `profile.html?name=${encodeURIComponent(name)}&birthDate=${encodeURIComponent(birthDate)}&hobby=${encodeURIComponent(hobby)}&favoriteMovie=${encodeURIComponent(favoriteMovie)}&idol=${encodeURIComponent(idol)}`;
    window.location.href = profileUrl;
}








