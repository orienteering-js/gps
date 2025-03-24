import type { z } from "zod";

export type InternalEventSchemaType = z.ZodObject<
  {
    id: z.ZodNumber;
    name: z.ZodString;
    start_date: z.ZodString;
    end_date: z.ZodString;
    publish_date: z.ZodString;
    map_id: z.ZodNumber;
    slug: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    publish_date: string;
    map_id: number;
    slug: string;
  },
  {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    publish_date: string;
    map_id: number;
    slug: string;
  }
>;

export type CompetitorSchemaType = z.ZodObject<
  {
    id: z.ZodNumber;
    device_id: z.ZodNumber;
    name: z.ZodString;
    marker_color: z.ZodString;
    shortname: z.ZodString;
    startnumber: z.ZodOptional<z.ZodAny>;
    start_time: z.ZodString;
    position: z.ZodNumber;
    end_time: z.ZodString;
    club: z.ZodString;
    tags: z.ZodArray<z.ZodAny, "many">;
    device_battery: z.ZodNumber;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: number;
    name: string;
    device_id: number;
    marker_color: string;
    shortname: string;
    start_time: string;
    position: number;
    end_time: string;
    club: string;
    tags: any[];
    device_battery: number;
    startnumber?: any;
  },
  {
    id: number;
    name: string;
    device_id: number;
    marker_color: string;
    shortname: string;
    start_time: string;
    position: number;
    end_time: string;
    club: string;
    tags: any[];
    device_battery: number;
    startnumber?: any;
  }
>;

export type SettingsSchemaType = z.ZodObject<
  {
    latitude: z.ZodString;
    longitude: z.ZodString;
    zoom: z.ZodString;
    tail_length: z.ZodString;
    replay_speed: z.ZodString;
    live_delay: z.ZodString;
    publish_competitors: z.ZodString;
    show_battery_info: z.ZodString;
    show_distance_info: z.ZodString;
    show_relative_time: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    latitude: string;
    longitude: string;
    zoom: string;
    tail_length: string;
    replay_speed: string;
    live_delay: string;
    publish_competitors: string;
    show_battery_info: string;
    show_distance_info: string;
    show_relative_time: string;
  },
  {
    latitude: string;
    longitude: string;
    zoom: string;
    tail_length: string;
    replay_speed: string;
    live_delay: string;
    publish_competitors: string;
    show_battery_info: string;
    show_distance_info: string;
    show_relative_time: string;
  }
>;

export type PointSchemaType = z.ZodObject<
  {
    lat: z.ZodNumber;
    lng: z.ZodNumber;
  },
  "strip",
  z.ZodTypeAny,
  {
    lat: number;
    lng: number;
  },
  {
    lat: number;
    lng: number;
  }
>;

export type CoordinatesSchemaType = z.ZodObject<
  {
    bottomLeft: z.ZodObject<
      {
        lat: z.ZodNumber;
        lng: z.ZodNumber;
      },
      "strip",
      z.ZodTypeAny,
      {
        lat: number;
        lng: number;
      },
      {
        lat: number;
        lng: number;
      }
    >;
    bottomRight: z.ZodObject<
      {
        lat: z.ZodNumber;
        lng: z.ZodNumber;
      },
      "strip",
      z.ZodTypeAny,
      {
        lat: number;
        lng: number;
      },
      {
        lat: number;
        lng: number;
      }
    >;
    topRight: z.ZodObject<
      {
        lat: z.ZodNumber;
        lng: z.ZodNumber;
      },
      "strip",
      z.ZodTypeAny,
      {
        lat: number;
        lng: number;
      },
      {
        lat: number;
        lng: number;
      }
    >;
    topLeft: z.ZodObject<
      {
        lat: z.ZodNumber;
        lng: z.ZodNumber;
      },
      "strip",
      z.ZodTypeAny,
      {
        lat: number;
        lng: number;
      },
      {
        lat: number;
        lng: number;
      }
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    bottomLeft: {
      lat: number;
      lng: number;
    };
    bottomRight: {
      lat: number;
      lng: number;
    };
    topRight: {
      lat: number;
      lng: number;
    };
    topLeft: {
      lat: number;
      lng: number;
    };
  },
  {
    bottomLeft: {
      lat: number;
      lng: number;
    };
    bottomRight: {
      lat: number;
      lng: number;
    };
    topRight: {
      lat: number;
      lng: number;
    };
    topLeft: {
      lat: number;
      lng: number;
    };
  }
>;

export type MapSchemaType = z.ZodObject<
  {
    url: z.ZodString;
    width: z.ZodNumber;
    height: z.ZodNumber;
    coordinates: z.ZodObject<
      {
        bottomLeft: z.ZodObject<
          {
            lat: z.ZodNumber;
            lng: z.ZodNumber;
          },
          "strip",
          z.ZodTypeAny,
          {
            lat: number;
            lng: number;
          },
          {
            lat: number;
            lng: number;
          }
        >;
        bottomRight: z.ZodObject<
          {
            lat: z.ZodNumber;
            lng: z.ZodNumber;
          },
          "strip",
          z.ZodTypeAny,
          {
            lat: number;
            lng: number;
          },
          {
            lat: number;
            lng: number;
          }
        >;
        topRight: z.ZodObject<
          {
            lat: z.ZodNumber;
            lng: z.ZodNumber;
          },
          "strip",
          z.ZodTypeAny,
          {
            lat: number;
            lng: number;
          },
          {
            lat: number;
            lng: number;
          }
        >;
        topLeft: z.ZodObject<
          {
            lat: z.ZodNumber;
            lng: z.ZodNumber;
          },
          "strip",
          z.ZodTypeAny,
          {
            lat: number;
            lng: number;
          },
          {
            lat: number;
            lng: number;
          }
        >;
      },
      "strip",
      z.ZodTypeAny,
      {
        bottomLeft: {
          lat: number;
          lng: number;
        };
        bottomRight: {
          lat: number;
          lng: number;
        };
        topRight: {
          lat: number;
          lng: number;
        };
        topLeft: {
          lat: number;
          lng: number;
        };
      },
      {
        bottomLeft: {
          lat: number;
          lng: number;
        };
        bottomRight: {
          lat: number;
          lng: number;
        };
        topRight: {
          lat: number;
          lng: number;
        };
        topLeft: {
          lat: number;
          lng: number;
        };
      }
    >;
    tiles: z.ZodString;
    name: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    name: string;
    url: string;
    width: number;
    height: number;
    coordinates: {
      bottomLeft: {
        lat: number;
        lng: number;
      };
      bottomRight: {
        lat: number;
        lng: number;
      };
      topRight: {
        lat: number;
        lng: number;
      };
      topLeft: {
        lat: number;
        lng: number;
      };
    };
    tiles: string;
  },
  {
    name: string;
    url: string;
    width: number;
    height: number;
    coordinates: {
      bottomLeft: {
        lat: number;
        lng: number;
      };
      bottomRight: {
        lat: number;
        lng: number;
      };
      topRight: {
        lat: number;
        lng: number;
      };
      topLeft: {
        lat: number;
        lng: number;
      };
    };
    tiles: string;
  }
>;

export type EventSchemaType = z.ZodObject<
  {
    event: z.ZodObject<
      {
        id: z.ZodNumber;
        name: z.ZodString;
        start_date: z.ZodString;
        end_date: z.ZodString;
        publish_date: z.ZodString;
        map_id: z.ZodNumber;
        slug: z.ZodString;
      },
      "strip",
      z.ZodTypeAny,
      {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
        publish_date: string;
        map_id: number;
        slug: string;
      },
      {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
        publish_date: string;
        map_id: number;
        slug: string;
      }
    >;
    competitors: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodNumber;
          device_id: z.ZodNumber;
          name: z.ZodString;
          marker_color: z.ZodString;
          shortname: z.ZodString;
          startnumber: z.ZodOptional<z.ZodAny>;
          start_time: z.ZodString;
          position: z.ZodNumber;
          end_time: z.ZodString;
          club: z.ZodString;
          tags: z.ZodArray<z.ZodAny, "many">;
          device_battery: z.ZodNumber;
        },
        "strip",
        z.ZodTypeAny,
        {
          id: number;
          name: string;
          device_id: number;
          marker_color: string;
          shortname: string;
          start_time: string;
          position: number;
          end_time: string;
          club: string;
          tags: any[];
          device_battery: number;
          startnumber?: any;
        },
        {
          id: number;
          name: string;
          device_id: number;
          marker_color: string;
          shortname: string;
          start_time: string;
          position: number;
          end_time: string;
          club: string;
          tags: any[];
          device_battery: number;
          startnumber?: any;
        }
      >,
      "many"
    >;
    tracks: z.ZodString;
    settings: z.ZodObject<
      {
        latitude: z.ZodString;
        longitude: z.ZodString;
        zoom: z.ZodString;
        tail_length: z.ZodString;
        replay_speed: z.ZodString;
        live_delay: z.ZodString;
        publish_competitors: z.ZodString;
        show_battery_info: z.ZodString;
        show_distance_info: z.ZodString;
        show_relative_time: z.ZodString;
      },
      "strip",
      z.ZodTypeAny,
      {
        latitude: string;
        longitude: string;
        zoom: string;
        tail_length: string;
        replay_speed: string;
        live_delay: string;
        publish_competitors: string;
        show_battery_info: string;
        show_distance_info: string;
        show_relative_time: string;
      },
      {
        latitude: string;
        longitude: string;
        zoom: string;
        tail_length: string;
        replay_speed: string;
        live_delay: string;
        publish_competitors: string;
        show_battery_info: string;
        show_distance_info: string;
        show_relative_time: string;
      }
    >;
    map: z.ZodUnion<
      [
        z.ZodObject<
          {
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
            coordinates: z.ZodObject<
              {
                bottomLeft: z.ZodObject<
                  {
                    lat: z.ZodNumber;
                    lng: z.ZodNumber;
                  },
                  "strip",
                  z.ZodTypeAny,
                  {
                    lat: number;
                    lng: number;
                  },
                  {
                    lat: number;
                    lng: number;
                  }
                >;
                bottomRight: z.ZodObject<
                  {
                    lat: z.ZodNumber;
                    lng: z.ZodNumber;
                  },
                  "strip",
                  z.ZodTypeAny,
                  {
                    lat: number;
                    lng: number;
                  },
                  {
                    lat: number;
                    lng: number;
                  }
                >;
                topRight: z.ZodObject<
                  {
                    lat: z.ZodNumber;
                    lng: z.ZodNumber;
                  },
                  "strip",
                  z.ZodTypeAny,
                  {
                    lat: number;
                    lng: number;
                  },
                  {
                    lat: number;
                    lng: number;
                  }
                >;
                topLeft: z.ZodObject<
                  {
                    lat: z.ZodNumber;
                    lng: z.ZodNumber;
                  },
                  "strip",
                  z.ZodTypeAny,
                  {
                    lat: number;
                    lng: number;
                  },
                  {
                    lat: number;
                    lng: number;
                  }
                >;
              },
              "strip",
              z.ZodTypeAny,
              {
                bottomLeft: {
                  lat: number;
                  lng: number;
                };
                bottomRight: {
                  lat: number;
                  lng: number;
                };
                topRight: {
                  lat: number;
                  lng: number;
                };
                topLeft: {
                  lat: number;
                  lng: number;
                };
              },
              {
                bottomLeft: {
                  lat: number;
                  lng: number;
                };
                bottomRight: {
                  lat: number;
                  lng: number;
                };
                topRight: {
                  lat: number;
                  lng: number;
                };
                topLeft: {
                  lat: number;
                  lng: number;
                };
              }
            >;
            tiles: z.ZodString;
            name: z.ZodString;
          },
          "strip",
          z.ZodTypeAny,
          {
            name: string;
            url: string;
            width: number;
            height: number;
            coordinates: {
              bottomLeft: {
                lat: number;
                lng: number;
              };
              bottomRight: {
                lat: number;
                lng: number;
              };
              topRight: {
                lat: number;
                lng: number;
              };
              topLeft: {
                lat: number;
                lng: number;
              };
            };
            tiles: string;
          },
          {
            name: string;
            url: string;
            width: number;
            height: number;
            coordinates: {
              bottomLeft: {
                lat: number;
                lng: number;
              };
              bottomRight: {
                lat: number;
                lng: number;
              };
              topRight: {
                lat: number;
                lng: number;
              };
              topLeft: {
                lat: number;
                lng: number;
              };
            };
            tiles: string;
          }
        >,
        z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>
      ]
    >;
    overlays: z.ZodArray<z.ZodAny, "many">;
  },
  "strip",
  z.ZodTypeAny,
  {
    map:
      | {
          name: string;
          url: string;
          width: number;
          height: number;
          coordinates: {
            bottomLeft: {
              lat: number;
              lng: number;
            };
            bottomRight: {
              lat: number;
              lng: number;
            };
            topRight: {
              lat: number;
              lng: number;
            };
            topLeft: {
              lat: number;
              lng: number;
            };
          };
          tiles: string;
        }
      | {};
    event: {
      id: number;
      name: string;
      start_date: string;
      end_date: string;
      publish_date: string;
      map_id: number;
      slug: string;
    };
    competitors: {
      id: number;
      name: string;
      device_id: number;
      marker_color: string;
      shortname: string;
      start_time: string;
      position: number;
      end_time: string;
      club: string;
      tags: any[];
      device_battery: number;
      startnumber?: any;
    }[];
    tracks: string;
    settings: {
      latitude: string;
      longitude: string;
      zoom: string;
      tail_length: string;
      replay_speed: string;
      live_delay: string;
      publish_competitors: string;
      show_battery_info: string;
      show_distance_info: string;
      show_relative_time: string;
    };
    overlays: any[];
  },
  {
    map:
      | {
          name: string;
          url: string;
          width: number;
          height: number;
          coordinates: {
            bottomLeft: {
              lat: number;
              lng: number;
            };
            bottomRight: {
              lat: number;
              lng: number;
            };
            topRight: {
              lat: number;
              lng: number;
            };
            topLeft: {
              lat: number;
              lng: number;
            };
          };
          tiles: string;
        }
      | {};
    event: {
      id: number;
      name: string;
      start_date: string;
      end_date: string;
      publish_date: string;
      map_id: number;
      slug: string;
    };
    competitors: {
      id: number;
      name: string;
      device_id: number;
      marker_color: string;
      shortname: string;
      start_time: string;
      position: number;
      end_time: string;
      club: string;
      tags: any[];
      device_battery: number;
      startnumber?: any;
    }[];
    tracks: string;
    settings: {
      latitude: string;
      longitude: string;
      zoom: string;
      tail_length: string;
      replay_speed: string;
      live_delay: string;
      publish_competitors: string;
      show_battery_info: string;
      show_distance_info: string;
      show_relative_time: string;
    };
    overlays: any[];
  }
>;
