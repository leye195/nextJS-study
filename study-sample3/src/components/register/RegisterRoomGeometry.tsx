import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "store";
import { registerRoomActions } from "store/registerRoom";
import throttle from "lodash/throttle";
import Colors from "styles/color";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 3.8rem 1.8rem 6.2rem;

  h2 {
    margin-bottom: 3.5rem;
    font-size: 19px;
    font-weight: 800;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 14px;
    font-weight: bold;
    color: ${Colors["gray76" as string]};
  }

  h4 {
    font-weight: bold;
  }

  .register-room-step-info {
    margin-bottom: 1.5rem;
    max-width: 400px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    word-break: keep-all;
  }

  .register-room-geometry-map-wrapper {
    width: 487px;
    height: 280px;
    margin-top: 1.5rem;

    & > div {
      width: 100%;
      height: 100%;
    }

    .gmnoprint .gm-style-mtc,
    .gm-svpc,
    .gm-fullscreen-control {
      display: none;
    }
  }
`;

declare global {
  interface Window {
    initMap: () => void;
  }
}

const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

const RegisterRoomGeometry: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

  const loadMap = async () => {
    await loadMapScript();
  };

  window.initMap = () => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        zoom: 14,
      });
      const marker = new window.google.maps.Marker({
        position: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        map,
      });

      map.addListener(
        "center_changed",
        throttle(() => {
          const centerLat = map.getCenter().lat();
          const centerLng = map.getCenter().lng();
          marker.setPosition({ lat: centerLat, lng: centerLng });
          dispatch(registerRoomActions.setLatitude(centerLat));
          dispatch(registerRoomActions.setLongitude(centerLng));
        }, 150),
      );
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <Container>
      <h2>핀이 놓인 위치가 정확한가요?</h2>
      <h3>4단계</h3>
      <div className="register-room-step-info">
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
        확인하세요.
      </div>
      <div className="register-room-geometry-map-wrapper">
        <div ref={mapRef} id="map" />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/location"
        nextHref="/room/register/amentities"
        isValid
      />
    </Container>
  );
};

export default RegisterRoomGeometry;
