from collections import OrderedDict

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param, remove_query_param

class DefaultPagePagination(PageNumberPagination):
    page_size = 25

class ThreePerPagePagination(PageNumberPagination):
    page_size = 3

class SixPerPagePagination(PageNumberPagination):
    page_size = 6

class TenPerPagePagination(PageNumberPagination):
    page_size = 10

class FithteenPerPagePagination(PageNumberPagination):
    page_size = 15

class TwentyPerPagePagination(PageNumberPagination):
    page_size =20