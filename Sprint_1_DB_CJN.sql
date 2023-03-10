PGDMP     ,    3                {            QAP1    15.1    15.1 "    6           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            7           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            8           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            9           1262    16451    QAP1    DATABASE     h   CREATE DATABASE "QAP1" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "QAP1";
                postgres    false            ?            1259    16528    aircraft    TABLE     ?   CREATE TABLE public.aircraft (
    id bigint NOT NULL,
    type character varying(200) NOT NULL,
    airline_name character varying(200) NOT NULL,
    passanger_capicity bigint NOT NULL,
    passenger_id bigint
);
    DROP TABLE public.aircraft;
       public         heap    postgres    false            ?            1259    16667    aircraft_airport    TABLE     X   CREATE TABLE public.aircraft_airport (
    aircraft_id bigint,
    airport_id bigint
);
 $   DROP TABLE public.aircraft_airport;
       public         heap    postgres    false            ?            1259    16523    airports    TABLE     ?   CREATE TABLE public.airports (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    airport_code character varying(3) NOT NULL,
    passenger_used bigint
);
    DROP TABLE public.airports;
       public         heap    postgres    false            ?            1259    16513    cities    TABLE     ?   CREATE TABLE public.cities (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    province character varying(200) NOT NULL,
    population bigint NOT NULL
);
    DROP TABLE public.cities;
       public         heap    postgres    false            ?            1259    16654    city_airports    TABLE     Q   CREATE TABLE public.city_airports (
    airport_id bigint,
    city_id bigint
);
 !   DROP TABLE public.city_airports;
       public         heap    postgres    false            ?            1259    16680    passenger_airport    TABLE     Z   CREATE TABLE public.passenger_airport (
    passenger_id bigint,
    airport_id bigint
);
 %   DROP TABLE public.passenger_airport;
       public         heap    postgres    false            ?            1259    16693    passenger_plane    TABLE     Y   CREATE TABLE public.passenger_plane (
    passenger_id bigint,
    aircraft_id bigint
);
 #   DROP TABLE public.passenger_plane;
       public         heap    postgres    false            ?            1259    16518 
   passengers    TABLE     ?   CREATE TABLE public.passengers (
    id bigint NOT NULL,
    first_name character varying(200) NOT NULL,
    last_name character varying(200) NOT NULL,
    phone_number character varying(12) NOT NULL,
    city_id bigint
);
    DROP TABLE public.passengers;
       public         heap    postgres    false            /          0    16528    aircraft 
   TABLE DATA           \   COPY public.aircraft (id, type, airline_name, passanger_capicity, passenger_id) FROM stdin;
    public          postgres    false    217   ?&       1          0    16667    aircraft_airport 
   TABLE DATA           C   COPY public.aircraft_airport (aircraft_id, airport_id) FROM stdin;
    public          postgres    false    219   o'       .          0    16523    airports 
   TABLE DATA           J   COPY public.airports (id, name, airport_code, passenger_used) FROM stdin;
    public          postgres    false    216   ?'       ,          0    16513    cities 
   TABLE DATA           @   COPY public.cities (id, name, province, population) FROM stdin;
    public          postgres    false    214   ?(       0          0    16654    city_airports 
   TABLE DATA           <   COPY public.city_airports (airport_id, city_id) FROM stdin;
    public          postgres    false    218   ?)       2          0    16680    passenger_airport 
   TABLE DATA           E   COPY public.passenger_airport (passenger_id, airport_id) FROM stdin;
    public          postgres    false    220   ?)       3          0    16693    passenger_plane 
   TABLE DATA           D   COPY public.passenger_plane (passenger_id, aircraft_id) FROM stdin;
    public          postgres    false    221   )*       -          0    16518 
   passengers 
   TABLE DATA           V   COPY public.passengers (id, first_name, last_name, phone_number, city_id) FROM stdin;
    public          postgres    false    215   y*       ?           2606    16517    cities Cities_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT "Cities_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.cities DROP CONSTRAINT "Cities_pkey";
       public            postgres    false    214            ?           2606    16532    aircraft aircraft_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.aircraft
    ADD CONSTRAINT aircraft_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.aircraft DROP CONSTRAINT aircraft_pkey;
       public            postgres    false    217            ?           2606    16527    airports airports_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.airports
    ADD CONSTRAINT airports_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.airports DROP CONSTRAINT airports_pkey;
       public            postgres    false    216            ?           2606    16570    passengers city_unique 
   CONSTRAINT     f   ALTER TABLE ONLY public.passengers
    ADD CONSTRAINT city_unique UNIQUE (city_id) INCLUDE (city_id);
 @   ALTER TABLE ONLY public.passengers DROP CONSTRAINT city_unique;
       public            postgres    false    215            ?           2606    16568 	   cities id 
   CONSTRAINT     O   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT id UNIQUE (id) INCLUDE (id);
 3   ALTER TABLE ONLY public.cities DROP CONSTRAINT id;
       public            postgres    false    214            ?           2606    16522    passengers passengers_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.passengers
    ADD CONSTRAINT passengers_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.passengers DROP CONSTRAINT passengers_pkey;
       public            postgres    false    215            ?           2606    16670    aircraft_airport aircraft_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.aircraft_airport
    ADD CONSTRAINT aircraft_fk FOREIGN KEY (aircraft_id) REFERENCES public.aircraft(id);
 F   ALTER TABLE ONLY public.aircraft_airport DROP CONSTRAINT aircraft_fk;
       public          postgres    false    219    3477    217            ?           2606    16696    passenger_plane aircraft_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.passenger_plane
    ADD CONSTRAINT aircraft_fk FOREIGN KEY (aircraft_id) REFERENCES public.aircraft(id);
 E   ALTER TABLE ONLY public.passenger_plane DROP CONSTRAINT aircraft_fk;
       public          postgres    false    217    221    3477            ?           2606    16662    city_airports airport_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.city_airports
    ADD CONSTRAINT airport_fk FOREIGN KEY (airport_id) REFERENCES public.airports(id) NOT VALID;
 B   ALTER TABLE ONLY public.city_airports DROP CONSTRAINT airport_fk;
       public          postgres    false    218    3475    216            ?           2606    16675    aircraft_airport airport_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.aircraft_airport
    ADD CONSTRAINT airport_fk FOREIGN KEY (airport_id) REFERENCES public.airports(id);
 E   ALTER TABLE ONLY public.aircraft_airport DROP CONSTRAINT airport_fk;
       public          postgres    false    219    3475    216            ?           2606    16688    passenger_airport airport_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.passenger_airport
    ADD CONSTRAINT airport_fk FOREIGN KEY (airport_id) REFERENCES public.airports(id);
 F   ALTER TABLE ONLY public.passenger_airport DROP CONSTRAINT airport_fk;
       public          postgres    false    220    216    3475            ?           2606    16657    city_airports city_fk    FK CONSTRAINT     u   ALTER TABLE ONLY public.city_airports
    ADD CONSTRAINT city_fk FOREIGN KEY (city_id) REFERENCES public.cities(id);
 ?   ALTER TABLE ONLY public.city_airports DROP CONSTRAINT city_fk;
       public          postgres    false    218    3467    214            ?           2606    16683    passenger_airport passenger_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.passenger_airport
    ADD CONSTRAINT passenger_fk FOREIGN KEY (passenger_id) REFERENCES public.passengers(id);
 H   ALTER TABLE ONLY public.passenger_airport DROP CONSTRAINT passenger_fk;
       public          postgres    false    220    3473    215            ?           2606    16701    passenger_plane passenger_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.passenger_plane
    ADD CONSTRAINT passenger_fk FOREIGN KEY (passenger_id) REFERENCES public.passengers(id);
 F   ALTER TABLE ONLY public.passenger_plane DROP CONSTRAINT passenger_fk;
       public          postgres    false    3473    221    215            /   ?   x?M???@E??W????TVh?,t??:??L2?Ŀ???9?9?ñ?v5??u-;?}"L`??8p?޹?PH?鄔?鵩F??
rX&??JvO}a|?qǟm?ݹk ???nX???m????(yP????yddH?(0??A?t???#e??G??{|?:??f4J??W#'???G????6|?>[?J??ߊwU       1   @   x??? 1?޸?U?ܽ??:v???L(??M?K???Y?q??b?tG:?5????????K
|      .   ?   x?e??N1E??_?/@M??-?4??ʖ?Ӻ??31???=!??ƛc?c]ߠ3??#???c??z?< ?	k?xI?A??
?<?Ѳ?????c???)?kЪE?`????Ol.???_g?cNK?rv;bi??=??:?I???o?`Ak<r0>????%mp'b_????m?,fyr?~H?X?)??????n????????;???W?Շ?-???'?Z}?      ,   ?   x?m?=?0??˯??&?Im]? ED]RzE???R??I?o??y?.?˴?????#~z?~???bG?`,w????g3V`??????$D???p?;?^&???c?^?zQBm??L???z????ȣ?%.???6pB毗?޸T?sC{߷???mq???yL!??????`?{ZԌ
????H??/II?m-????uf      0   7   x??9?0 ?zL???\?G?
?Rm4S?n???`??N???[?ߴ??G? ???      2   O   x?˹?@??.?Ϟ???<??8???b??5t7wM-Om/??Vx???s??????tEWtE?^??],      3   @   x????P??0L??}?K?????BJ?
LX.???$n??j?u??˸!?u?????? ??
F      -   ?   x?]??n?0E?w?????????Ue?m7n2?`K???6?ٞ???k???%D??zM???i????0T?%}?#?܍?sV?J?pS+???yՍU???,^??9???0t??x??oa??a?Y.???6Z?jr8M???-?7k?਑?9?8???&?h?????dJ?x2?yj?,?-??V?hFS?[??wq??i???o'}????jM?     