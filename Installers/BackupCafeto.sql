toc.dat                                                                                             0000600 0004000 0002000 00000007515 13636562402 0014456 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       (    :                x            prueba_cafeto    11.5    11.5                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                    0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                    0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                    1262    85680    prueba_cafeto    DATABASE     �   CREATE DATABASE prueba_cafeto WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Colombia.1252' LC_CTYPE = 'Spanish_Colombia.1252';
    DROP DATABASE prueba_cafeto;
             postgres    false         �            1259    85696    comments    TABLE     �   CREATE TABLE public.comments (
    id character varying(32) NOT NULL,
    paragraph text,
    user_id character varying(32),
    stars integer,
    movie_id character varying(32),
    created timestamp without time zone
);
    DROP TABLE public.comments;
       public         postgres    false         �            1259    85681    users    TABLE     �   CREATE TABLE public.users (
    id character varying(32) NOT NULL,
    username character varying(32),
    name character varying(64),
    password character varying(64)
);
    DROP TABLE public.users;
       public         postgres    false         �            1259    85691    users_follow    TABLE     m   CREATE TABLE public.users_follow (
    user_from character varying(32),
    user_to character varying(32)
);
     DROP TABLE public.users_follow;
       public         postgres    false                   0    85696    comments 
   TABLE DATA               T   COPY public.comments (id, paragraph, user_id, stars, movie_id, created) FROM stdin;
    public       postgres    false    198       2824.dat           0    85681    users 
   TABLE DATA               =   COPY public.users (id, username, name, password) FROM stdin;
    public       postgres    false    196       2822.dat           0    85691    users_follow 
   TABLE DATA               :   COPY public.users_follow (user_from, user_to) FROM stdin;
    public       postgres    false    197       2823.dat �
           2606    85703    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public         postgres    false    198         �
           2606    85695    users_follow user_from_to 
   CONSTRAINT     b   ALTER TABLE ONLY public.users_follow
    ADD CONSTRAINT user_from_to UNIQUE (user_from, user_to);
 C   ALTER TABLE ONLY public.users_follow DROP CONSTRAINT user_from_to;
       public         postgres    false    197    197         �
           2606    85685    users user_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public         postgres    false    196         �
           2606    85720    users username_uk 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_uk UNIQUE (username);
 ;   ALTER TABLE ONLY public.users DROP CONSTRAINT username_uk;
       public         postgres    false    196         �
           2606    85714    comments user_fk    FK CONSTRAINT     o   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);
 :   ALTER TABLE ONLY public.comments DROP CONSTRAINT user_fk;
       public       postgres    false    198    196    2693                                                                                                                                                                                           2824.dat                                                                                            0000600 0004000 0002000 00000000773 13636562402 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        5dSsaf5yUHLhK_Wa2SZI0	callese sapoooo	uP09rduCUUocPH7seppV7	1	243	\N
ZEbgI4kzHqQw8wfiCMiRU	callese sapoooo	uP09rduCUUocPH7seppV7	1	243	\N
123	123	123	5	243	\N
SudQO6e6K10DE9Zu7Ubhk	hablame sapoooo	uP09rduCUUocPH7seppV7	5	243	\N
VZLh9icgnBOfqUyuALJ_c	Ask the person maintaining the server at http://172.16.1.157:8002/ to add your hostname to Access-Control-Allow-Origin hosts, the server should return a header similar to the following with the response-	uP09rduCUUocPH7seppV7	1	243	2020-03-22 02:46:44
\.


     2822.dat                                                                                            0000600 0004000 0002000 00000001026 13636562402 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        123	locazo	el pachanga	\N
X9N_T7C6nCTKsuqkhpNeb	laveruca	veruca	$2b$05$4m9sNw5DDjzgjdGPsITys.IgH1LKaJvCHcBltv9t2MrJDkdqnMUki
uP09rduCUUocPH7seppV7	pachanga	hablame pachanga	$2b$05$xMbvJxj6Je.AdlG3SNnc.em.KXRJKhzNVQn33U3eovkG4UeaMTRe2
djauo7UzriBNiJRutzMtT	rocky	rocky	$2b$05$kFVGOC9ZwuCev2K5ac25Vu5YGJ9u0WOd5y7PgDn.CGukdqRtRMELO
c1rqgDpSXNNB32IribZVW	miguelito	100	$2b$05$Nq600o118Z0aokw4DT0nXu8ElErKc7py7NU2Bo1/sLD5u7pkjtIkm
8ludopOuLf0P0ZTXe2Dbp	manticora	manticora	$2b$05$8O1ZsjlEp48w7khZpPOoge5vCF5glseWkM7omdjS.D./uCqyxn8xe
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          2823.dat                                                                                            0000600 0004000 0002000 00000000037 13636562402 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        uP09rduCUUocPH7seppV7	123
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 restore.sql                                                                                         0000600 0004000 0002000 00000007422 13636562402 0015400 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE prueba_cafeto;
--
-- Name: prueba_cafeto; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE prueba_cafeto WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Colombia.1252' LC_CTYPE = 'Spanish_Colombia.1252';


ALTER DATABASE prueba_cafeto OWNER TO postgres;

\connect prueba_cafeto

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id character varying(32) NOT NULL,
    paragraph text,
    user_id character varying(32),
    stars integer,
    movie_id character varying(32),
    created timestamp without time zone
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(32) NOT NULL,
    username character varying(32),
    name character varying(64),
    password character varying(64)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_follow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_follow (
    user_from character varying(32),
    user_to character varying(32)
);


ALTER TABLE public.users_follow OWNER TO postgres;

--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, paragraph, user_id, stars, movie_id, created) FROM stdin;
\.
COPY public.comments (id, paragraph, user_id, stars, movie_id, created) FROM '$$PATH$$/2824.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, name, password) FROM stdin;
\.
COPY public.users (id, username, name, password) FROM '$$PATH$$/2822.dat';

--
-- Data for Name: users_follow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_follow (user_from, user_to) FROM stdin;
\.
COPY public.users_follow (user_from, user_to) FROM '$$PATH$$/2823.dat';

--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: users_follow user_from_to; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_follow
    ADD CONSTRAINT user_from_to UNIQUE (user_from, user_to);


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: users username_uk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_uk UNIQUE (username);


--
-- Name: comments user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              