const Verify = {
  distanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRad = value => value * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },

  getLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("GPS is not supported on this device."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  },

  async check(target, radiusMeters) {
    const position = await this.getLocation();

    const distance = this.distanceMeters(
      position.coords.latitude,
      position.coords.longitude,
      target.lat,
      target.lon
    );

    return {
      verified: distance <= radiusMeters,
      distance,
      userLat: position.coords.latitude,
      userLon: position.coords.longitude,
      accuracy: position.coords.accuracy
    };
  }
};
