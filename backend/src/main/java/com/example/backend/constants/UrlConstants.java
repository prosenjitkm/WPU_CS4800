package com.example.backend.constants;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UrlConstants {

    private static final String BASE_URL = "/api";
    public static final String BASE_PRODUCT_URL = BASE_URL + "/products";
    public static final String BASE_USER_URL = BASE_URL + "/users";
    public static final String BASE_LOGIN_URL = BASE_URL + "/login";

    public static final String ADD_PRODUCT = BASE_PRODUCT_URL;
    public static final String DELETE_PRODUCT = BASE_PRODUCT_URL + "/{id}";
    public static final String UPDATE_PRODUCT = BASE_PRODUCT_URL + "/{id}";

    public static final String GET_PRODUCT_IMAGE = BASE_PRODUCT_URL + "/image/{id}";

    public static final String ADD_USER = BASE_USER_URL;
    public static final String DELETE_USER = BASE_USER_URL + "/{id}";
    public static final String UPDATE_USER = BASE_USER_URL + "/{id}";

    public static final String GET_USER_BY_USERNAME = BASE_USER_URL + "/username/{username}";

    public static final String LOGIN_USER = BASE_LOGIN_URL;
}
