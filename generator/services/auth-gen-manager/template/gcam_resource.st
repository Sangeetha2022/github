gcam_resource(object) ::= <<

export const resourcetypes = [
  {
    "resource_name": "manageroles",
    "resource_type": "screen",
    "roles": [
      "admin"
    ],
    "components": [{
      "label_1425":
      {
        "id": "878979",
        "roles": [
          "admin"
        ]
      },
      "textbox_6272":
      {
        "id": "135979",
        "roles": [
          "admin"
        ]
      },
      "label_2437":
      {
        "id": "343979",
        "roles": [
          "admin"
        ]
      },
      "dropdown_73821":
      {
        "id": "738291",
        "roles": [
          "admin"
        ]
      }
    }
    ]
  },
  {
    "resource_name": "home",
    "resource_type": "screen",
    "roles": [
      "user", "admin
    ],
    "components": [{
      "label_1425":
      {
        "id": "878979",
        "roles": [
          "admin"
        ]
      },
      "textbox_6272":
      {
        "id": "135979",
        "roles": [
          "admin"
        ]
      },
      "label_2437":
      {
        "id": "343979",
        "roles": [
          "admin"
        ]
      },
      "dropdown_73821":
      {
        "id": "738291",
        "roles": [
          "admin"
        ]
      }
    }
    ]
  },
  {
    "resource_name": "manageusers",
    "resource_type": "screen",
    "roles": [
      "admin"
    ],
    "components": [{
      "label_1425":
      {
        "id": "878979",
        "roles": [
          "admin"
        ]
      },
      "textbox_6272":
      {
        "id": "135979",
        "roles": [
          "admin"
        ]
      },
      "label_2437":
      {
        "id": "343979",
        "roles": [
          "admin"
        ]
      },
      "dropdown_73821":
      {
        "id": "738291",
        "roles": [
          "admin"
        ]
      }
    }
    ]
  },
  {
    "resource_name": "admin",
    "resource_type": "screen",
    "roles": [
      "admin"
    ],
    "components": [{
      "label_1425":
      {
        "id": "878979",
        "roles": [
          "admin"
        ]
      },
      "textbox_6272":
      {
        "id": "135979",
        "roles": [
          "admin"
        ]
      },
      "label_2437":
      {
        "id": "343979",
        "roles": [
          "admin"
        ]
      },
      "dropdown_73821":
      {
        "id": "738291",
        "roles": [
          "admin"
        ]
      }
       }
    ]
  },
  {
    "resource_name": "sefscreen",
    "resource_type": "screen",
    "roles": [
      "admin","user"
    ],
    "components": [{
      "label_1425":
      {
        "id": "878979",
        "roles": [
          "admin"
        ]
      },
      "textbox_6272":
      {
        "id": "135979",
        "roles": [
          "admin"
        ]
      },
      "label_2437":
      {
        "id": "343979",
        "roles": [
          "admin"
        ]
      },
      "dropdown_73821":
      {
        "id": "738291",
        "roles": [
          "admin"
        ]
      }
    }
    ]
  },
  {
    "resource_name": "authorization",
    "resource_type": "screen",
    "roles": [
      "admin"
    ],
    "components": [{
      "label_1425":
      {
        "id": "878979",
        "roles": [
          "admin"
        ]
      },
      "textbox_6272":
      {
        "id": "135979",
        "roles": [
          "admin"
        ]
      },
      "label_2437":
      {
        "id": "343979",
        "roles": [
          "admin"
        ]
      },
      "dropdown_73821":
      {
        "id": "738291",
        "roles": [
          "admin"
        ]
      }
    }
    ]
  },
  {
    "resource_name": "landing",
    "resource_type": "screen",
    "roles": [
      "guest"
    ],
    "components": [
      {
        "login": {
          "id": "878979",
          "roles": [
            "admin",
            "user",
            "guest"
          ]
        },
        "signup": {
          "id": "135979",
          "roles": [
            "admin",
            "user",
            "guest"
          ]
        },
      }
    ]
  },
  {
    $if(object)$$object:{ value |
    "resource_name": "$value.resources$",
    "resource_type": "screen",
    "roles": [
      "admin", "$value.role$"
    ],
    };separator="\n"$$endif$
    "components": [{
      "label_1425":
      {
        "id": "878979",
        "roles": [
          "admin"
        ]
      },
      "textbox_6272":
      {
        "id": "135979",
        "roles": [
          "admin"
        ]
      },
      "label_2437":
      {
        "id": "343979",
        "roles": [
          "admin"
        ]
      },
      "dropdown_73821":
      {
        "id": "738291",
        "roles": [
          "admin"
        ]
      }
    }
    ]
    },
    
]

>>